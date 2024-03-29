/**
 * @description 事件循环
 * 参考阅读
 * https://juejin.cn/post/6966158666030383118
 *
 * 1. 一个event loop有一个或者多个macrotask队列 setTimeout&I/O&UI rendering
 * 2. 不同的是一个event loop里只有一个microtask 队列 process.nextTick promises Object.observe MutationObserver
 * 3. 宏任务队列 & 微任务队列 & 执行栈（函数调用的过程分析）
 * 4. 浏览器的 update rendering(更新渲染)
 * 5. 完整的 event loop 过程（宏任务插入队列，微任务插入队列，但是后者执行完在执行前者）
 * 6. 如何界定一次完整的事件循环
 *  主线程，执行栈，任务队列
 * 7. node 环境下的事件循环
 */


/**
 * @des: 常见的事件机制
 *  背景：一般写业务很少处理原生html事件，一是组件库封装好了二是框架层做了处理
 *       但是知道一些细节可以有助于排查问题
 *  1. dom事件机制
 *    1.1 https://juejin.cn/post/6844903731079675917
 *    1.2 https://juejin.cn/post/6844903781969166349
 *  2. 框架处理的事件机制
 *    2.1 vue对事件绑定的处理
 *      2.1.1 对html的事件绑定，类似原生，落在指令和修饰符
 *    2.2 vue的事件系统（观察者模式）
 *      2.2.1 组件系统的事件绑定
 *      2.2.2 组件绑定原生事件，组件事件的修饰符
 *    2.3 react事件机制
 *      2.3.1 类组件绑定事件还是有this问题和重复渲染问题
 *      2.3.2 有自己的合成事件机制，主要处理兼容性和跨平台
 *      2.3.3 直观感觉是vue 组件实例自己调度处理事件，而react是往document/根实例上委托事件
 *    2.4 js的事件循环（区分浏览器和node运行时）
 *
 */
