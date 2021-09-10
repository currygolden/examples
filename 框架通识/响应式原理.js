/* https://ustbhuangyi.github.io/vue-analysis/v2/extend/tansition.html#entering
  这里 打算准备一些亮点
  
  说清楚vue的响应式原理需要从以下几点
  1.Vue init 阶段，对所有的属性做了 reactive 化，为每一个属性绑定了 getter 函数, setter 函数以及一个 Dep 对象。
  2.Vue 组件 mount 阶段里调用了 mountComponent 方法，此方法中为 Vue 组件创建了一个 Watcher 对象。
  3.Watcher 对象创建的时候，顺带执行了 Vue 的更新函数，这触发了 Vue reactive 化的属性 的 get 方法, 并调用了 dep.depend()。
  4.dep与watcher构成了观察者模式
  5.数组和对象的处理不同
  6.组件的产出是vNode,那组件 - virtual-dom - dom，带来的是分层设计
  7. 2.x响应式存在的问题，以及3.x如何实现响应式的
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
