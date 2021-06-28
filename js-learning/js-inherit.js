/* 
  主要探讨es6/es5的继承方式
  https://github.com/mqyqingfeng/Blog/issues/16
  https://segmentfault.com/a/1190000016708006
  https://juejin.im/post/5bf37a5ee51d4552da47dae9
  修改函数原型指向，会导致constructor失效
  组合寄生式继承利用空函数中转的意义
  obj = Function.prototype 与obj = new Function()
  继承是通过原型，但是通过构造函数的处理，保证属性不会互相影响
*/

// 基于prototype
// 缺点：实例属性在原型上，修改会互相影响
function Person(name, age) {
  this.name = name
  this.age = age
}
// 避免函数一次次定义，所以写在原型上
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
  // 这里需要从arguments中取第一个
  // var context = context || window
  var context = [...arguments].shift()
  var args = []
  // 获取调用call2的函数
  context.fn = this
  // 获取调用的参数
  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i])
  }
  // call需要一个个传参,apply传数组不展开即可
  var result = context.fn(...args)
  delete context.fn
  return result
}

// 三：组合式继承
// 原型继承的属性服从构造函数继承的属性
// 调用了2次构造函数
// 原型链继承的属性会被构造函数重写？
// 这是否和new 一个对象有关

function combineInherint() {
  // call一次parent
  Parent.call(this,arguments)
}
combineInherint.prototype = new Parent()

// 模拟实现new的过程
// new()，可以访问私有和原型链的属性，并且返回一个对象，支持传参
// 如过构造函数本身提供返回值，无法改动否则取我们的返回值
// var person = new Human(a,b,c)
// var person = myNew(Human,a,b,c)

var myNew = function() {
  // 定义我们返回的对象
  var obj = new Object()
  // 取到用来产生实例的函数
  // argument是类数组，用call方法
  Constructor = [].shift.call(argument)
  // 实现组合继承
  obj.__proto__ = Constructor.prototype
  // 为了判断构造函数本身的返回值
  // this绑定为obj,即生成的对象
  var result = Constructor.apply(obj,...argument)

  return typeof result === 'object' ? result : obj
}

// object.create的模拟实现
// 原始类型不关联，引用类似相互影响

_create = function (o) {
  let F = function () {}
  F.prototype = o
  return new F()
}

/* 
  es6 继承 http://es6.ruanyifeng.com/#docs/class-extends
  1. 属性 public/private 等
  2. 对于一些关键的属性，容易导致核心流程问题，可以使用setter/getter 存储器来控制读写

*/
class Parent {
  constructor(name,age) {
    this.name = name
    this.age = age
  }
  hello() {
    
  }
}
class Child extends Parent {
  constructor(name,age,color) {
    // 必须先super才可以使用this
    super(x,y) // 继承父类的哪些属性
    this.color = color
  }
}


/* 
数据类型判断
instanceof: 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
*/