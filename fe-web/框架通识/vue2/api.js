/**
 * @description 介绍常见api和使用
 * 1. 常见Vue.xxx 全局api
 * 2. 指令，插件，过滤器
 */

/**
 * Vue.use： 形如Vue.xx的称为全局api,和this.$xxx区别
 * 1.插件通常用来为 Vue 添加全局功能
 * 2.如果插件是一个对象，必须提供 install 方法。
 * 3.如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入
 * 4.插件只会被安装一次
 * 5.由于暴露Vue,所以插件业务逻辑里可以全局的事情
 */

Vue.use = function (plugin, ...args) {
  // 是否已经安装,引用类型也可以用indexOf
  const installedPlugins = this._installedPlugins || []
  if (installedPlugins.indexOf(plugin)) {
    return this
  }

  // 加入Vue参数
  args.unshift(this)
  // 是对象且有install方法 || 插件本身是函数
  if (typeof plugin.install === 'function') {
    plugin.install.apply(plugin, args)
  } else if (typeof plugin === 'function') {
    plugin.apply(null, args)
  }

  installedPlugins.push(plugin)
}


/**
 * @description Vue.extend
 * 1. 创建基于Vue构造类的子类，接收options参数，返回值可以new xxx 创建组件实例
 * 2. 一般写框架，库会使用，业务中不常见
 */

/**
 * @description Vue.nextTick/this.$nextTick
 * 1. 下次 DOM 更新循环之后执行回调
 * 2. 作为视图更新优化设计的api,当多次触发数据更新，会创建异步更新队列queneWatcher,相同的watcher只包含一个
 * 3. 异步的能力检测 Promise.then、MutationObserver 和 setImmediate，setTimeout(fn, 0)看采用哪一种实现宏/微任务
 * 4. nextTick的回调在异步队列中执行，需要处理多次nextTick和嵌套nextTick的场景
 */

/**
 * @description vue 指令/自定义指令
 * 1. 对普通 DOM 元素进行底层操作，需要经过编译阶段处理
 * 2. 全局注册，局部注册，获取指令
 * 3. 钩子函数在vNode的create,update生命周期调用
 * 4. 钩子函数参数
 */

/**
 * @description vue 过滤器filters
 * 1. 全局注册，局部注册，可以串联使用，本质是一个函数
 * 2. 使用：{{ val | filters | filters2 }}
 * 3. 编译结果是_f("capitalize")(message)，对于多过滤器编译会形成一层层的嵌套_f("capitalize2")(_f("capitalize")(message))
 * 4. 钩子函数参数
 */

