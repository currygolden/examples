/* 对于vue框架 需要了解的
https://juejin.cn/post/6844903918753808398
https://ustbhuangyi.github.io/vue-analysis/v2
https://vue-js.com/learn-vue/ (*****)
https://juejin.cn/post/7043401297302650917
https://www.zhihu.com/question/31809713/answer/53544875

这四类文章能把vue 知识体系串起来，只能说常读常新，合适的时候带着目的去阅读vue 源码

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
  2. $mount主要做了哪些事情，大概描述下vue的初次渲染过程
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

5. vue的模版编译
  5.1 之前介绍vue包含runtime+complier版本，其中complier到底做了什么，render函数提供了v-dom，render从哪来的
    5.1.1 解读render函数
      render的参数包含createElement函数，用来生成Vnode
  5.2 处理编译目的是走到dom,此时beforecreate,create已经走完，数据的准备已经结束，create阶段主要是init，处理事件，生命周期，响应式，等等
  5.3 编译阶段主要是compileToFunctions(template)，判断template来源，可以是配置提供的，可以是根据el属性找到的，最终相当于mount阶段确定了renderFn
  5.4 compileToFunctions 包含parse & generate，很典型的Babel处理过程，此处不深究处理细节，待Babel学习之后再来回顾，目前了解主要流程即可


6. watcher有哪些类型，computed和watch有什么区别
    6.1 直观看watcher的构造类 constructor(vm, exprOrFn, cb, options)
      对于 render watcher，exprOrFn就是render函数，此时每一个属性的dep收集了相关的watcher
      对于 computed watcher，exprOrFn是computed的getter，一般计算属性没有setter,此时提供一个lazy:true
        1.computed的值或者说计算取决lazy后面叫dirty的值，主要体现在 watcher.evaluate()和watcher.depend()
        2.watcher.evaluate() 是实际的求值，并且活在计算之后将dirty置为false
        3.在render过程访问computed时，触发其getter,调用watcher.depend() 是当前的watcher里的deps 收集全部的 render watcher
          而实际执行getter逻辑时，会触发data属性的getter,此时deps收集 computed watcher
          最后就是惰性求值的差别,可以看出与 data的差异在于收集watcher和求值过程都是不同的
      对于watch watcher exprOrFn 是属性或者字符串，也是触发getter收集watcher（回调）的过程，是一个user watcher
        总体来看都拓展于 watcher的构造类，有deep,computed,user,sync 几种类型

  7. 虚拟组件的实现
    7.1 keep-alive: 应该是vNode的生成不需要重新走render，之前的vNode得到了缓存
*/
