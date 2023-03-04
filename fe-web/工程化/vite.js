/*
 * @Author: your name
 * @Date: 2022-04-15 17:48:21
 * @LastEditTime: 2022-08-07 20:23:34
 * @LastEditors: liyu38 liyu38@meituan.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/fe-web/工程化/vite.js
 * 参考阅读：
 * 1. https://juejin.cn/post/7012880929102233637 vue2 传统项目迁移vite
 * 2. https://juejin.cn/post/7064853960636989454 vite 原理介绍
 * 2. https://juejin.cn/post/7043777969051058183 vite 系列解读文章
 */
/**
 * 1. vue2 项目迁移vite
 *  1.1 根据index.html 确认服务器根目录
 *  1.2 import() 动态引入不支持
 *  1.3 .vue 文件引入文件名不能省略
 *
 *
 * 2. vite解读
 *  2.1 类似import&type=module 的模块（即esmodule）写法，在浏览器原生支持的背景下，打包工作由浏览器接管
 *
  */










 /**
  * 用问题来推动学习或许目的性更强
  * 1. vite的优势和当前打包工具存在的问题是
  *   构建启动慢，需要打包后启动本地服务
  *   热更新在项目规模增大后效率降低
  *   本地服务的打包由浏览器处理，实际需要打包由esbuild 处理，对比传统打包工具快
  * 2. 浏览器支持 esmodule 意味着什么
  *   本地服务不需要打包，将模块转为esmodule即可
  *   未来web 端的模块标准化
  * 3. 历史常见为什么需要打包，而 esmodule 在开发环境为什么可以不打包
  *   先说不打包，由于浏览器可以识别，模块就是一个个http请求，自然也实现了按需加载
  *   浏览器不识别html,js,css以外的资源，可以一整个文件去加载，但是无法利用http的缓存，浪费网络资源，所以打包做模块划分，将文件标准化
  * 5. 总体来看， vite包含什么，由什么组成
  *   一个开发服务器
  *   一套构建指令，以及可拓展的api
  * 6. 什么是 npm 依赖解析和预构建
  *   对于第三方模块（对比源码）会重写导入路径，添加node_module 前缀,一般来说第三方模块子模块太多还是会做打包优化
  *   利用esbuild 将CommonJS / UMD 转换为 ESM（浏览器可识别的资源）
  *   在本地的vite目录下，HTTP 头来缓存请求得到的依赖，强缓存
  * 7. vite 构建过程中是如何处理源码和依赖的
  *   拦截http 请求，利用中间件,esbuild处理 html,vue.jsx转为浏览器可是别的模块，第三方包类似，二者缓存策略不同
  *   模块转为ESM，源码会协商缓存
  * 8. 生产环境为什么还是需要打包
  *   如果是一个个的子模块对应http请求，即使http2 也存在问题，还是需要做模块拆分，按需加载，做适当的缓存
  * 9. vite 的热更新是如何实现的
  *   也是建立websocket连接，监听文件变化，不过少了构建打包的过程
  * 10. 在开发阶段是使用esbuild,在生产阶段使用rollup的目的是？
  *
  *
  *
  */





/**
 * vite 项目源码分析
 * 1. 和历史脚手架类似，直接去/bin/vite.js
 *   根据命令行参数区分不同的场景，注入环境变量，最后是执行dist/node/cli(为什么是 dist)
 *   cli的命令大致分为5类
 *   全局命令
 *   dev 场景
 *   build 场景
 *   optimize 场景
 *   preview 场景
 *
 * 2. dev 命令(主要理解 createServer 一系列的流程)
 *   1. 利用 createServer 创建本地服务器
 *   2. 有一个解析参数的过程
 *      合并配置，用户配置，自定义配置
 *      定义logger
 *      解析全部插件并分成三类
 *      解析worker
 *      执行插件，并且将返回值进一步与配置项合并
 *      等等。。。 一系列解析合并参数的过程
 *  3. 利用http 创建server,利用connect 创建connect中间件，再使用websocket包裹（server 里很清晰，子模块在各个文件维护）
 *     利用 chokidar 创建 watcher
 *     创建 moduleGraph
 *     创建 插件容器（估计是和rollup 插件体系打通的理由）
 *     定义热更新（文件改变的逻辑）执行
 *     一系列的内部中间件
 *
 *  ================> 逐步拆解流程细节
 *  4.理解 ModuleGraph
 *    这里有两个概念，在vite 里 module是什么（对比webpack）,后者好说是一种数据结构
 *    在 ModuleGraph 里定义了 modulenode的格式
 *    之后定义了4中map和1个set,处理module的映射关系
 *    ModuleGraph 的实例化依赖 createPluginContainer 最后提供的resolveId
 *
 *  5.理解vite实现的热更新
 *
 *
 *
 *
 *  6.理解PluginContainer（或者说vite 的插件体系）
 *   发现了acorn，这个是在webpack里递归分析依赖用到的，loader处理之后的文件由acor分析ast, 进一步分析出依赖
 *   Plugin extends RollupPlugin
 *   定义拓展了一些类型变量
 *   最后导出一个 createPluginContainer 函数
 *     1. 接受参数 ResolvedConfig：解析的一堆参数配置，moduleGraph，watcher
 *     2. 定义了一系列debug场景，看起来也是打印一些信息
 *     3. 利用import 实现require的场景，import.meta由ecmascript 实现
 *
 *
 *
 *   最终返回的 container 实例
/


/**
 * @description 带着问题阅读
 * 1. cli场景分类和对命令行参数的处理
 *    1.1 如何结合实际自定义命令，处理一些工程问题
 *    1.2
 *
 *
 *
 *
  */
