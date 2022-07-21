/* https://ustbhuangyi.github.io/vue-analysis/v2/extend/tansition.html#entering
    https://juejin.cn/post/6974293549135167495 vue系列文章
  这里 打算准备一些亮点
*/

/* 计算属性的特点
  1. computed也具有响应式特征，那getter从那里来，一般没有setter
  2. 计算属性是一个 computed watcher，它和普通的 watcher 有什么区别呢,
  3. 计算属性的依赖会把自身持有的 dep 添加到当前正在计算的 watcher 中
  4. 渲染 watcher 订阅了这个 computed watcher 的变化，这个解释了如何派发更新

  watch属性就有些不一样的了，属于userwatch,它并没有像computed/data一样定义getter/setter，而是关注回调函数
*/

/*
模拟实现 observe 函数
*/
function observe (data) {
  // let dep = new Dep() // 这是用来收集watch的订阅器
  if (!data || typeof data !== 'object') return
  // 遍历data数据，逐一处理
  Object.keys(data).forEach((item) => {
    if (typeof item === 'object') {
      observe(item)
    } else {
      defineReactive(data,item,data[item])
    }
  })
}

function defineReactive (obj,key,value) {
  const dep = new Dep()
  Object.defineProperty(obj,key,{
    enumerable: true, // 可枚举，可以遍历访问
    configurable: true, // 可以删除
    get: function reactiveGetter () {
      /*
      收集依赖，返回值
      */
     dep.addSubs('key')
     console.log('collect')
     return value
    },
    set: function reactiveSetter () {
      /*
      触发依赖
      */
     dep.notify()
    }
  })
}

class Dep {
  constructor () {
    // 这是用来保存watcher的数组
    // watcher 实际是一个函数或者表达式
    this.subs = []
  }
  addSubs (sub) {
    this.subs.push(sub)
  }
  notify () {
    this.subs.forEach((sub) => {
      // 实际是触发watch的更新函数
      sub.update()
    })
  }
}




/*
  vue3 处理响应式的办法
  1. 解决对象 增加/删除属性；处理数组通过下标修改 历史问题
  2. api层面的 object.defineProperty 有局限性对象crud的实现，而且在报错层面对于框架代码不友好
  3. 使用 proxy/reflect 开展对象的代理和操作

  eg1 代理操作一个对象
  eg2 如何在框架中使用，收集触发的场景
*/
let person = {
  name: 'jj',
  age: 30
}
const p = new Proxy(person, {
  // 读取触发
  get(target, propName) {
    console.log(`读取p的${propName}属性 `)
    return Reflect.get(target, propName)
  },
  // 新增&修改属性触发
  set(target, propName, value) {
    console.log(`修改p的${propName}属性 `)
    Reflect.set(target, propName, value)
  },
  // 删除属性触发
  deleteProperty(target, propName) {
    console.log(`删除p的${propName}属性 `)
    return Reflect.deleteProperty(target, propName)
  }
})




/**
 * 系统介绍vue响应式原理
 * 1. 什么是响应式
 *    1.1 将数据渲染到dom不是，从model到view也不是，数据的更新如何触发视图的修改
 *    1.2 响应式数据一般指data,props,计算属性，在初始化阶段做了一些处理，主要就是代理属性和响应式处理数据
 *        代理是指类似data和prop的访问形式，其实就是改写了set和get 方法，使其看起来是操作this
 *    1.3 处理props的响应式用的是 defineReactive，而处理data是通过 observe 方法
 *        observe： 给非 VNode 的对象类型数据添加一个 Observer，形如val.__ob__ 的属性
 *        Observer类的实现：
 *          1. def函数：给value添加__ob__属性，即一个 Observer，通过 Object.defineProperty 方法
 *          2. dep属性：通过new Dep()创建该属性
 *            Dep 是一个典型的观察者模式，对 watcher 的处理
 *            vm._render()会触发对数据的访问，也即是完成数据的依赖收集，此时确定watcher的类型，进而确定属性上的dep 属性
 *            面临一个问题是何时做依赖的重新收集（是再次触发 vm._render()吗），也就是考虑清楚去除订阅的必要性（数据是响应式，但是没有使用）
 *          3. 对数组和对象分别做响应式处理
 *            处理对象：defineReactive，主要就是定义属性的getter&setter,对子属性递归处理
 * 2. 响应式过程分析
 *      如何定性的描述响应式，并给出伪代码实现（技术细节和边界场景暂时不深究）
 *    2.1 什么是响应式，见前文定义，数据修改，视图更新
 *    2.2 什么是响应式对象
 *      主要介绍props&data 数据，1:属性代理层，2:通过defineReactive重写 getter&setter,另一点是给对象添加ob属性，ob属性是基于Observer类实现的，其上定义了dep属性
 *      dep属性跟渲染watcher构成了观察者模式（dep属性到底是在哪一步提供的）
 *      递归遍历，对象和数组处理不同
 *    2.3 过程介绍
 *      触发vm.render()，在 getter中收集依赖，实现dep 对watcher的监听 dep.depend()，每次触发vm.render()都会导致重新收集依赖，所以dep里处理了新旧的对比，以及保证Dep.target同一时间唯一
 *      在 setter 中派发更新，实际上是处理dep 中 watcher 数组的回调，watcher 数组构成了队列，此时存在异步更新队列，父子组件顺序等场景的优化
 *    2.4 对象增加属性，数组修改长度，索引访问不能触发响应式
 *    2.5 computed和watch 应该说思想上类似，只不过具体watcher 的实现细节有差异，此时接触了三类watcher
 *        当计算属性最终计算的值发生变化才会触发渲染
 *
  */
