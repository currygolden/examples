/**
 * @description 介绍设计模式
 * 参考文章
 * https://www.runoob.com/design-pattern/visitor-pattern.html
 * 发布与订阅模式，vue事件绑定
 *
 */
function EventEmitter() {
  this._events = Object.create(null)
}
EventEmitter.prototype.addListenrs = function(type, fn) {
  if (this._events[type]) {
    this._events[type].push(fn)
  } else {
    this._events[type] = [fn]
  }
}

EventEmitter.prototype.removeListenrs = function(type, fn) {
  if (Array.isArray(this._events[type])) {
    if (!fn) {
      delete this._events[type]
    } else {
      this._events[type] = this._events[type].filter(e => {
        return e !== fn
      })
    }
  }
}

EventEmitter.prototype.once = function(type, fn) {
  const origin = (...args) => {
    fn.apply(this, args)
    this.removeListenrs(type, fn)
  }
  this.addListenrs(type, origin)
}

EventEmitter.prototype.emit = function(type, args) {
  if (Array.isArray(this._events[type])) {
    this._events[type].forEach(item => {
      item.apply(this, [...args])
    })
  }
}






/*观察者模式
vue响应式
*/
