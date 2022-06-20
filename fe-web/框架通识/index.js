/* 对于vue框架 需要了解的
https://juejin.cn/post/6844903918753808398
https://ustbhuangyi.github.io/vue-analysis/v2

*/

/*
这里整理框架会遇到的问题（仅vue）
框架是为了解决并优化某些问题而产生的，类似这里的问题需要分大的模块，基本是基于源码结构的视角
1.数据驱动
  1.1 什么是virtual-dom，如何遍历html结构得到类似的js对象
  1.2 如何由 js对象 生成 html (dom api)
  1.3 diff 算法大致的原理是什么
  1.4 组件更新的流程描述

  大致描述数据驱动在源码层面的流程
  1. new Vue()时做了一系列初始化的事情
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
    之后就需要处理$mount
  2. $mount主要做了哪些事情
    把 el 或者 template 字符串转换成 render 方法，是调用 compileToFunctions 方法实现的
    执行 mountComponent，会实例化一个渲染Watcher，在此方法中调用 vm._render 方法先生成虚拟 Node， 最终调用 vm._update 更新 DOM
    vm._render实际调用了 createElement 来生成vnode（从而建立了vdom的设计），vnode一般是指对dom节点的描述，当然也包含组件的Vnode
    有了前一步的vNode tree，通过vm._update渲染成真实的dom,在此之前需要vm.__patch__（也就是典型的diff算法实现）
    最后createElm 生成并插入dom节点
  3. 以上的构成了从数据到dom的过程，包括初始化和更新




2. 组件化设计
  2.1 组件的生命周期
  2.2 组件通信方式
  2.3 了解哪些虚拟组件
  2.4 使用过异步组件吗

3. 响应式原理
  这一部分其实和第一部分有重合，不过由于很重要，单独说一下
  3.1 initState 利用Object.defineProperty描述响应式对象
  3.2 在调用$mount render 函数访问数据，收集依赖
  3.3 建立dep 与watcher的观察者模式，在setter时触发依赖
    触发依赖是有优化的 watcher的update会在nexttick执行，第二watcher队列的执行会根据id排序
  3.4 Dep,Watcher类的实现
  3.5 nexttick 的实现实际是对回调函数是基于 宏任务还是微任务的调用方式判断
  3.6 2.x响应式对对象和数组操作的局限性，数组方法是如何处理的


4. 项目中的使用心得
  1 项目组件化建设的经验，组件库/library的思路
  2 复用组件的经验，比如 mixins 插件 指令

*/
