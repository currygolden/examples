/* 
模拟实现 observe 函数
*/
function observe (data) {
  let dep = new Dep // 这是用来收集watch的订阅器
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
  Object.defineProperty(obj,key,{
    enumerable: true, // 可枚举，可以遍历访问
    configurable: true, // 可以删除
    get: function reactiveGetter () {
      /* 
      收集依赖，返回值
      */
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
    this.subs = []
  }
  addSubs (sub) {
    this.subs.push(sub)
  }
  notify () {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}