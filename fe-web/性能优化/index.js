
/**
 * 预加载，缓存，分包机制，多进程，离线化
 * 1. h5项目背景（需要性能优化的原因，高PV,横向对比需要指标治理）
 * 2. 建立评价指标
 *  2.1 接入监控，获取tp90/95/99，基于典型指标数据或者业务实际角度出发建立评价指标
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


/**
 * @description C端业务优化实际案例分析
 * 参考文档： https://docs.sankuai.com/mt/wm/enlight-manager/master/usage/intro/detail/
 * 1. 业务背景简介
 * 2. 确定评价指标
 *    2.1 行业类似业务评价指标横向对比
 * 3. 性能问题分析步骤
 *    3.1 建立从开始到首屏时间的时间线（一般基本类似，特殊业务场景分析）
 *      3.1.0 若存在容器启动，则有一层webview优化过程
 *      3.1.1 获取主文档（理解具体的 html 结构场景，是否存在阻塞，重绘）
 *        3.1.1.1 主文档动静分离，基础库部分缓存到客户端本地
 *      3.1.2 基础库资源加载，解析
 *        同上
 *      3.1.3 应用资源加载解析（app.js/vendor.js/module.js等等）
 *        3.1.3.1 首屏资源必要性拆分，非必要资源懒加载
 *        3.1.3.2 接口依赖场景：梳理接口场景，做资源预加载
 *      3.1.4 Dom 结构生成渲染（是一个断续的过程，受js资源的进度影响，本质上是浏览器线程调度）
 * 4. 可行性分析&技术方案设计
 *    4.1 对关键点做流程分析，图例介绍
 * 5. 技术降级方案/回滚方案/稳定性保证
 * 6. 优化效果对比，结果量化数据展示
 * 7. 未来规划
 *    7.1 最终性能优化应该是工程化的方案，交给容器本身来处理
 *    7.2 就跟项目的工程配置一样，性能优化方案都类似，最终需要结合业务场景做取舍
 *
 */
