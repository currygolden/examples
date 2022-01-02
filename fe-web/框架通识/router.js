/* 
参考文章： https://juejin.cn/post/6844903612930326541
如何理解vue-router的实现原理

1. 如何实现url变化页面渲染更新但是不刷新浏览器
2. 对于hash模式，处理路由变化对应页面更新
3. history模式需要借助pushState和replaceState
4. 插件提供的install 方法会混入属性和钩子函数，特别是将路由表当作响应式数据
5. 路由切换和组件渲染卸载都有钩子函数
*/