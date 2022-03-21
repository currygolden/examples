/**
 * 算是异步场景的一个话题
 * 1. 一个event loop有一个或者多个macrotask队列 setTimeout&I/O&UI rendering
 * 2. 不同的是一个event loop里只有一个microtask 队列 process.nextTick promises Object.observe MutationObserver
 * 3. 宏任务队列 & 微任务队列 & 执行栈（函数调用的过程分析）
 * 4. 浏览器的 update rendering(更新渲染)
 * 5. 完整的 event loop 过程（宏任务插入队列，微任务插入队列，但是后者执行完在执行前者）
 * 6. 如何界定一次完整的事件循环
 *  主线程，执行栈，任务队列
 * 7. node 环境下的事件循环
 */