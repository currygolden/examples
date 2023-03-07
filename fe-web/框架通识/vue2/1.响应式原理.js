/* https://ustbhuangyi.github.io/vue-analysis/v2/extend/tansition.html#entering
    https://juejin.cn/post/6974293549135167495 vue系列文章
    https://juejin.cn/user/3104676570214286/posts vue系列文章2
  这里 打算准备一些亮点
*/


/**
 * 系统介绍vue响应式原理
 * 1. 什么是响应式
 *    1.1 定义：数据的更新触发视图的修改，注意双向数据绑定这个词在官方文档没有出现，这个词不严谨
 *    1.2 首先是将数据转为响应式数据，vue组件里的data函数返回的数据
 *      1.2.1 vue实例初始化时候走 initState,其中包含initData,当然也有 props，watch，methods，computed
 *      1.2.2 获取data函数返回的对象属性，遍历提供代理访问 this.data.a => this.a
 *      1.2.3 之后执行observe(data),主要逻辑由Observer类实现
 *      1.2.4 Observer类主要是添加__ob__属性（一个observer实例），其次是区分数组和对象的操作
 *        1.2.4.1 对于对象，递归处理直到最后调用defineReactive，重写getter和setter
 *        1.2.4.2 对于数组，调用observeArray，改写数组原型方法，对新增的元素做观测（一开始的观测和新增的观测）
 *          数组为什么不类似对象，根据key(索引index)作观测，对象的修改是o(1),数组除了尾部修改其它会导致索引全部变化，全部重新观测，这就是所谓的性能考虑
 *      1.2.5 这样完整实现响应式数据,只是响应式完整流程的一部分
 *
 *
 *
 *
 *
 *
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
