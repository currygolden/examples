/**
参考文章： https://juejin.cn/post/6844903612930326541
          https://juejin.cn/post/6895882310458343431
          https://juejin.cn/post/6854573222231605256
如何理解vue-router的实现原理

1. 如何实现url变化页面渲染更新但是不刷新浏览器
    1.1 hash 路由修改路径，不会触发向服务器发请求
    1.2 pushState&replaceState 都是修改url栈，但是不刷新页面
    1.3 spa 技术是实现前后端分离的关键吗
4. 插件提供的install 方法会混入属性和钩子函数，特别是将路由表当作响应式数据
5. 路由切换和组件渲染卸载都有钩子函数
6. csr和ssr的区别
7. vue-router 源码设计
*/
