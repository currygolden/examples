// https://github.com/mqyqingfeng/Blog/issues/12
/*  
  apply 仅仅是绑定this
  原型链继承造成引用类型共享，而构造函数 + call 不会，说清楚这个问题
  ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承
  对比之前的原生构造函数不可实现继承，因为忽略对this的修改
*/




/* 
call 模拟实现
1: 绑定this
2: 一个个的传参
3: 执行函数
4: 支持绑定null和存在返回值

*/
var foo = {
  value: 1
}
bar.call2(foo) // 看起来就是绑定this

Function.prototype.call2(context, ...args) = function() {
  // 绑定this
  context.fn = this || window
  // 获取参数

  // call方法需要一个个传参数
  var res = context.fn(...args)
  var res = context.fn([...args]) // apply
  delete context.fn
  return result
}

/* 
bind方法
1: 绑定this,
2: 返回函数且支持分步传参
*/
Function.prototype.bind2 = function(context) {
  // 获取this
  // context是要绑定的this
  var self = this
  var args = Array.prototype.slice.call(arguments,1)

  var resf =  function() {
    // 二级传参数
    var args2 = Arrat.prototype.slice.call(arguments).concat(args)
    // 提供返回值，绑定this，这一步是实际的模拟过程
    // 这个返回函数可能作为构造函数，此时context不生效
    // return self.apply(context, args2)
    return self.apply(this instanceof resf ? this : context, args2)
  }
  return resf
}



/* 
new 模拟实现
1: 可以访问this,原型属性
2: 构造器的原型执行新建对象
3: 构造函数本身存在返回值
*/

function shimNew() {
  var resObj = new Object()
  // 获取构造函数
  var constructor = [].shift.call(arguments)
  resObj.__proto__ = constructor.prototype
  // 处理返回值 
  // this绑定到新建实例上
  var ret = constructor.apply(resObj,arguments)

  return typeof ret === 'object' ? ret : resObj
}

/* 
模拟实现 object.create()
属于对象创建方式
*/


