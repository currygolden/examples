/**
 * 主要记录常见的手写实现（考察基础的逻辑能力&业务代码debug能力）
 * 参考阅读
 * ======js专题系列========
 * 1. 防抖&节流
 * 2. call&apply&bind
 * 3. 深浅拷贝
 * 4. 数组扁平化,去重,最值
 * 5. BFS/DFS递归遍历
 * 6. 数组常见方法实现
 * 7. 模拟实现new
 * 8. 模拟实现call/apply
 * 9. 模拟实现bind
 * 10. 观察者模式实现
 * 11. 函数的curry
 * 12. 实际应用封装axios
 * 13. 实现单例模式
 *
 *
 *
  */





/**
 * 参考：
 *  https://juejin.cn/post/6844903929705136141
 *  https://juejin.cn/post/6844903692756336653
 *  https://www.conardli.top/docs/JavaScript
 *  github的拆解文章
 *
 *
 *
 */



/**
 * ==============以下是草稿部分=========
 */
/**
 * @description 模拟call
 * 1. 绑定this,目标对象具有this的属性&方法
 * 2. 支持传参数和返回值，边界值
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

Function.prototype.call2 = function(context, ...args) {
  context.fn = this || window
  const res = context.fn(...args)
  delete context.fn
  return res
}

// 类似，参数支持数组
Function.prototype.apply2 = function(context, args) {
  context.fn = this || window
  let res
  if (Array.isArray(args)) {
    res = context.fn(...args)
  } else {
    res = context.fn(args)
  }
  delete context.fn
  return res
}

/**
 * @description 实现bind
 * 1. 绑定this,返回一个函数
 * 2. 支持分步参数，处理返回值
 */
Function.prototype.bind2 = function(context, ...args) {
  const that = this
  const resFn = function(...arg2) {
    if (this instanceof resFn) {
      // 直接当构造函数使用
      return this(...args, ...arg2)
    }
    return that.apply(context, [...args, ...arg2])
  }

  return
}

/**
 * @description 实现单次绑定
 *
 */
function bindOnce(type, listener) {
  const only = (...args) => {
    listener.apply(this, args)
    this.removeListener(type, listener)
  }

  this.addListener(type, only)
}

function testInstance(target, origin) {
  const proto = target.__proto__
  if (proto) {
    if (proto === origin.prototype) {
      return true
    } else {
      return testInstance(proto, origin)
    }
  }

  return false
}

/**
 * @description 防抖实现
 * 间隔固定的时间执行
 * 1. 返回一个函数
 * 2. this,参数，能否处理返回值
 * 3. 立即执行: 可以理解如何加锁，加标识位
 * 4. 取消
 *
 */

function myDebounce(fn, wait, now) {
  let timeout = null
  let result = null
  const resFn = function(...args) {
    const context = this
    clearTimeout(timeout)
    if (now) {
      // 没有定时器，代表第一次执行
      if (!timeout) result = fn.apply(context, [...args])
    } else {
      timeout = setTimeout(() => {
        fn.apply(context, [...args])
      }, wait)
    }

    return result
  }
  // 随时取消
  resFn.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return resFn
}

const say = function(val) {
  console.log(996+ val)
}
// myDebounce(say, 3000, true)('NB')
/**
 * @description 数组去重
 * 1. new Set()
 * 2. hashMap
 * 3. indexOf + filter
 */
function uniqueArr(arr = []) {
  const res = Array.from(new Set(arr))
  console.log('arr', res)
  // return Array.from(new Set(arr))
}
uniqueArr([1,2,3,4,4,2,1,3])
uniqueArr([1,2,3,4,4,2,1,3,'1','2','3','4', '2'])
