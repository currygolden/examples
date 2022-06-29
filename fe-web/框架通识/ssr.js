/**
 * @description 介绍ssr技术，考虑到技术选型&插件开发
 * 参考文章：
 * 1. https://juejin.cn/post/6844903709193797646
 * 2. https://v3.cn.vuejs.org/guide/ssr/   (官方文档)
 * 3. https://github.com/Neveryu/vue-ssr-lessons 比较好的node例子
 *
 */

/**
 * 1. vue ssr是做什么
 *   1.1 在服务器端把同样的组件渲染成 HTML 字符串，然后直接将其发送给浏览器，并最终将静态标记“激活”为完整的、可交互的客户端应用
 * 2. ssr的替代方案&技术选型考虑
 *   2.1 ssr的收益与问题
 *   2.2 prerender的方案比如 webpack 插件prerender-spa-plugin，开箱用的框架如 nuxt.js
 * 3. 处理通用代码需要考虑的场景（客户端&服务端）
 * 4. ssr处理流程
 *   4.1 将vue实例借助renderToString渲染成html串
 *   4.2 以上的流程在实际的http服务里实现，借助express或者koa
 *     此时实现初步的vue实例由服务端渲染成html,客户端成功展示
 *     使用额外的html模版，renderToString参数拓展，此时处理的都是模版类型
 *   4.3 实际打包会生成client&server两端的包，此时renderToString已经不处理vue实例，renderer.renderToString已经是webpack打包后的bundle
 *     4.3.1 打包client包，记录manifest.json,用来优化请求，做预加载，预请求
 *     4.3.2 createBundleRenderer将上一包的输出包装，调用renderToString 输出html
 *     4.3.3 这个过程主要了解两类包的打包差异和目标产物
 *     4.3.4 类似的引入router&vuex
 *   4.4 前面基本实现基于http服务将vue实例同构渲染，这里介绍服务端对数据的处理（核心在于如何保证数据状态相同）
 *     4.4.1 通过路由获得与 router.getMatchedComponents() 相匹配的组件
 *     4.4.2 如果组件暴露出 asyncData，我们就调用这个方法。然后我们需要将解析完成的状态，附加到渲染上下文(render context)中，这便是服务端数据的来源
 *     4.4.3 此时客户端如何保证数据状态一致呢
 *       通过 window.__INITIAL_STATE__ 将服务端 store 内容同步到客户端
 *       在客户端 store.replaceState(window.__INITIAL_STATE__)
 *
 */
