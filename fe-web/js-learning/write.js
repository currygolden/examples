/**
 * 主要记录常见的手写实现（考察基础的逻辑能力&业务代码debug能力）
 * 参考阅读
 * 
 * 
 * 1. 防抖&节流
 * 2. call&apply&bind
 * 3. 深浅拷贝
 * 4. 数组扁平化
 * 5. BFS/DFS递归遍历
 * 6. 数组常见方法实现
 * 7. 模拟实现new
 * 8. 模拟实现call/apply
 * 9. 模拟实现bind
 * 10. 观察者模式实现
 *
 *
 *
  */





/**
 * 参考：
 *  https://juejin.cn/post/6844903929705136141
 *  https://juejin.cn/post/6844903692756336653
 *
 *
 *
 *
 */






Function.prototype.bind2 = function(context, ...args) {
  const that = this

  const resFn = function(...args2) {
    if (this instanceof resFn) {
      return new that(...args, ...args2)
    }
    return that.apply(context, [...args, ...args2])
  }

  return resFn
}

function shimNew(construc, ...args) {
  const obj = Object.create(null)
  obj.__proto__ === construc.prototype
  const res = construc.apply(obj, args)

  return typeof res === 'object' ? res : obj
}

/**
 * @description 实现观察者模式
 * 1. addListener(event, listener)
 * 2. removeListener(event, listener)
 * 3. setMaxListeners(n)
 * 4. once(event, listener)
 * 5. emit(event, [arg1], [arg2], [...])
 * 关注点在于event
 * map 结构存储event&回调数组
 * 
  */
 function EventEmitter() {
   this._maxListeners = 10
   this.events = Object.create(null)
 }

EventEmitter.prototype.addListener = function(type, listener, prepend) {
  if (this.events[type] && Array.isArray(this.events[type])) {
    if (prepend) {
      this.events[type].unshift(listener)
    } else {
      this.events[type].push(listener)
    }
  } else {
    this.events[type] = [listener]
  }
}

EventEmitter.prototype.removeListener = function(type, listener) {
  if (Array.isArray(this.events[type])) {
    if (!listener) {
      delete this.events[type]
    } else {
      this.events[type].filter(item => item !== listener)
    }
  }
}

EventEmitter.prototype.once = function(type, listener) {
  
}

