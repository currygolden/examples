/*
如何描述项目的难点和所做过的优化方案
1. ssr


2. 打包优化



3. 访问优化




4. 项目遇到的难点和优化方案



*/




/*
1.有哪些关键的性能指标？
我们通常通过性能指标来衡量Web应用是否具有良好的加载体验，无论是 Chrome Devtools 还是 W3C 提供的 Navigation Timing API 都提供了许多参考指标。这些指标中哪些是需要重点关注，能够真实反映页面加载和渲染效率的呢？这里先回顾一下浏览器渲染机制，了解一下需要注意的关键节点。

1.1 浏览器渲染过程

获取HTML文档。浏览器从磁盘或网络读取 HTML 的原始字节。

解析HTML文档。解析 HTML 内容，加载<head>和<body>中的静态文件。

构建 DOM 和 CSSOM，合并成渲染树。将 HTML 转换成令牌，形成树模型。

布局和绘制。渲染树生成“盒模型”，获得视口内的确切位置和大小，将渲染树节点绘制为屏幕上的实际像素。

完全加载。开始加载异步资源，同时也会下载字体、图片等远程文件。

经过以上5个阶段，就完成了网页的加载和渲染。有效的利用Web性能指标的关键就在于抓住1~5阶段的关键时间点，以此找到相对应的性能优化策略。

1.2 网页加载的关键时间点
☆ 首字节时间

    指浏览器接收到 HTML 文档第一个字节的时间。此时间点之前，浏览器需要经过 DNS解析、重定向(若有)、建立 TCP/SSL 连接、服务器响应等过程。

☆ DOM 构建完成时间

    HTML 解析器完成 DOM 树构建的时间。此时间点之前，浏览器需要经过同步静态资源加载、内联 JavaScript 脚本运行、HTML 解析器生成 DOM 树的过程。

☆ DOM Ready 时间

    CSS树和DOM树合并渲染树后，并执行完成同步 JavaScript 脚本的时间。此时间点之前，包含了DOM树构建的过程、CSS树构建的过程、以及同步 JavaScript 脚本执行的时间。

☆ 首屏时间

    网页布局和绘制的完成，将用户设备视窗范围内的DOM节点渲染完成的时间。若首屏中包含异步请求才能完成渲染的内容，则需要包含等待异步请求和页面重绘的时间。

☆ 页面完全加载时间

    所有处理完成，并且网页上的所有资源（图像等）都已下载完毕的时间。此时会触发浏览器 onload 事件。

以上这些时间点，该如何进行检查和使用呢？在 2012年以后 W3C 提供了 Navigation Timing API 指标接口，我们尝试找出与上述各时间点之间的对应关系。

1.3 W3C 提供的性能指标
试图找出性能指标和页面渲染过程的对应关系：


W3C提供了大量的性能指标，对能够衡量性能的关键时间，这里做了整理：

首字节时间：responseStart

Dom 构建完成时间：domInteractive

Dom Ready时间：DOMContentLoadedEventEnd

页面完全加载时间：loadEventStart

首屏时间：无法体现

Navigation Timing API 提供了文档构建过程中的多数性能指标，对于传统的直出型页面，由于没有模块的异步加载页面过程，所以我们认为它的首次渲染时间即为DOM构建完成时间，页面渲染完毕即为页面完全加载时间。

但是对于 SPA（Single Page Application） 类型的页面，由于存在异步模块及远程数据的加载过程，需要找到一个能够衡量首次渲染和首屏时间的指标，于是下面会对 SPA 模式下的网页渲染指标进行更深入的探索。

2.SPA渲染指标的探索与验证
SPA 页面与传统直出页面最大不同在于 JS 对象与 DOM 结构之间的相互响应。由于这种模式在 HTML 解释器在遍历主文档时只挂载一个​<div id="app"> 节点，当 HTML 结构解析完毕时，真实的页面主体还未从 JS 对象转换成 DOM 插入页面。因此针对这种情况，需要单独分析与验证，我们先看下SPA 框架是什么时候完成首次渲染/首屏渲染的？如下图。


2.1 如何计算 SPA 的首次渲染时间？
SPA 是何时将首屏DOM节点插入网页中的呢？以 React 为例，准备了一个简单的场景进行验证。

利用 Chrome DevTools for Performance，观察 React 在渲染过程中性能相关的时间节点。


Chrome DevTools for Performance 我们从上到下关注 Network、Timings和Main 三栏。Network 记录了从页面开始加载后，资源请求的情况。Timings标记了一些重要的时间点如（DomContentLoaded、First Paint、Loaded）。Main展示了浏览器于何时会执行HTML解析与JavaScript文件解析。

页面开始加载后，浏览器按以下顺序执行页面解析构建与渲染：

请求所有相关资源

React接管渲染，开始执行渲染

浏览器标记DCL时间

浏览器开始渲染

首屏时间

浏览器完成渲染，标记Loaded时间

可以看到 React 项目在 DCL（SPA框架逻辑执行结束） 后，浏览器进行了首次渲染。在真实场景的项目中，也进行了多次同样的验证，观察到的现象与前述一致。

由此我们得出结论：SPA 页面会在渲染树构建完成后执行 SPA 框架逻辑，将虚拟 DOM 转换成 HTML 插入页面，首屏 DOM在 DCL 时间点完成插入，此时开始页面主体渲染。

2.2 如何计算 SPA 的首屏时间？
根据上面的结论，DCL 代表了 JavaScript 框架执行逻辑插入页面主体 DOM，这也代表了页面主体开始渲染的时间。那对于用户来说，页面首屏渲染完成的时间点怎么计算呢？因此 Raptor 提出首屏时间（First Screen Time）的采集计算模型。

计算模型中将首屏时间定义为浏览器视窗范围内的 DOM 达到稳定状态的时间。为了监测这个稳定状态，核心算法主要使用接口：MutationObserver。

MutationObserver 实例能够监听 DOM 变化并执行回调。当一定时间内没有再监听到首屏内 DOM 变化时，即可得出结果并停止监听。


这个算法在真实的业务场景下表现如何呢？我们在到店的多个核心业务下进行了算法的准确性验证。在业务中进行代码打点的首屏时间，与 Raptor owl 首屏算法采集的时间进行比对，结果如下：




    可以看出，经此算法计算的首屏时间，在大部分场景下，与自定义打点的首屏时间是相近的，误差并不大，可以作为统计首屏时间的依据。

3.利用Web性能指标排查性能问题
我们已经掌握了5个 Web 页面要关注的关键性能指标，正确掌握它们的使用姿势，才能准确分析页面性能的问题所在，从而进行针对性的优化。那么不同阶段的耗时过长，分别代表了一些什么问题呢？


问题表象

问题分析

排查方向

首字节时间过长

该阶段耗时过长代表着服务器响应和返回的时间长。可以借助首字节时间之前的几个指标进行更具体的分析，包括redirectStart、domainLookupStart等。

重定向过多

DNS 查询时间长

TCP 连接时间长

服务器性能差

DOM构建时间过长

浏览器解析 HTML 构建 DOM 树的过程中，会遇到 JavaScript、CSS 等关键资源，而 JavaScript 资源默认会阻塞 DOM 树的构建，直接影响了该阶段的性能。

未对非关键的 JavaScript 脚本使用异步标记，或是在空闲时异步加载非关键脚本

未对代码进行合理拆分，导致单个 JavaScript 脚本过大

未优先加载当前页面所需的关键 JavaScript 资源

未合理配置缓存策略

DOM Ready时间过长

该阶段内要完成 DOM 和 CSSOM 的构建，因此还需考虑 CSS 资源的阻塞因素。

未尽早引入关键 CSS 资源

未对 CSS 内容进行合理拆分，导致关键内容和非关键内容混合在一起

未合理配置缓存策略

未合理使用 CSS import 指令

未对非关键的 CSS 资源使用媒体查询等方式消除阻塞

首屏时间过长

首屏时间由首屏内容加载完成的时间决定。

未使用资源提示尽早下载首屏内容相关的资源

未优先发送首屏内容相关的请求

未对首屏外的内容使用异步加载或懒加载

完全加载时间过长

该阶段内要完成页面上所有资源的加载，资源加载的方式和资源的数据量都会影响该阶段的性能。

未对资源进行合理压缩

未合理配置缓存策略

未对图片等资源进行合理优化

依据上表，Web性能优化的关键在于尽快下载处理关键资源，同时消除非关键资源的阻塞，让用户花在网站上的大多数时间是在使用时等待响应，而不是等待资源的加载。

测速点统计 ：DOM Ready时间上报数总计
首字节时间 ：性能指标为 responseStart 的时间
DOM Ready时间 ：性能指标为 domContentLoadedEventEnd 的时间
页面完全加载时间 ：性能指标为 loadEventStart 的时间
首屏时间： dom稳定所采集的时间
网络成功率 ：包含 AJAX / CSS / JS / 静态资源 类型的请求
平均请求耗时 ：包含 AJAX / CSS / JS / 静态资源 类型的请求
*/


/**
 * 预加载，缓存，分包机制，多进程
 * 1. h5项目背景（需要性能优化的原因，高PV,横向对比需要指标治理）
 * 2. 建立评价指标
 *  2.1 接入监控，获取tp90/95/99
 *  2.2 采集初步监控指标数据
 *  2.3 描述从请求页面到最终可见的全流程
 *    2.3.1 网络请求部分到获取html文档，解析主文档过程（了解script标签的解析过程）
 *    2.3.2 html文档解析，构建dom树，样式计算，生成布局树
 * 2.4 根据以上页面渲染流程总结以下观察指标
 *  2.4.1 首字节时间：responseStart
 *  2.4.2 Dom 构建完成时间：domInteractive 构建出dom树
 *  2.4.3 Dom Ready时间：DOMContentLoadedEventEnd （生成布局树，后面开始渲染）
 *  2.4.5 首屏时间： 观测 dom 稳定性达到的时间 （自定义指标）
 *  2.4.6 页面完全加载时间：loadEventStart
 *  2.4.7 秒开率 = 页面首屏时间 < 1s 的比率，直出率 = 页面首屏时间 < 300ms 的比率
 * 2.5 针对2.4数据做对应优化方案
 *  2.5.1 DNS 查询时间长，重定向过多，TCP 连接时间长
 *  2.5.2 异步解析脚本，单个js文件不要太大，合理的缓存策略
 *  2.5.3 样式拆分，缓存策略
 *  2.5.4 由首屏页面的内容主导（资源提前，资源缓存），组件异步加载/懒加载
 *  2.5.6 其它静态资源 （压缩，缓存，加载优化图片字体等）
 * 2.6 具体项目实践
 *  2.6.1 html结构组织，放在body后或者body中，一些资源预获取（dns-prefetch）&客户端缓存
 *  2.6.2 首屏资源异步加载/懒加载
 *  2.6.3 native 容器优化,jsbridge（专题 web容器）
 *  2.6.4 打包策略优化，合理的分包机制
 *    2.6.4.1 本地开发采用vite
 *    2.6.4.2 webpack/rollup 常用打包配置
 *  2.6.5 指标对比，lighthouse 数据采集
 */
