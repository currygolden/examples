/* 
  主要探讨es6/es5的继承方式
*/

// 基于prototype
// 缺点：实例属性在原型上，修改会互相影响
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say() = function() {
  alert('I can speak')
}
function Student(gender) {
  this.gender = gender
}
Student.proptype = new Person()


// 基于构造函数
// 只实现继承私有属性
// call方法具体做了什么
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say() = function() {
  alert('I can speak')
}
function Student(gender, name, age) {
  this.gender = gender
  // 这里是构造函数直接调用，在外部直接调用是不允许的
  Person.call(this, name, age)
}

// 模拟实现call方法，绑定this+调用函数
// eg: 实现call2    bar.call2(foo, name, age)
// 支持传参，this不存在，提供返回值
Function.proptype.call2 = function(context) {
  var context = context || window
  var args = []
  // 获取调用call2的函数
  context.fn = this
  // 获取调用的参数
  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i])
  }
  // call需要一个个传参,apply不展开即可
  var result = context.fn(...[args])
  delete context.fn
  return result
}

// 三：组合式继承
// 原型继承的属性服从构造函数继承的属性
// 调用了2次构造函数

