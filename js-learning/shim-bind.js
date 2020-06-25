// https://github.com/mqyqingfeng/Blog/issues/12
/*  
  apply 仅仅是绑定this
  原型链继承造成引用类型共享，而构造函数 + call 不会，说清楚这个问题
  ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承
  对比之前的原生构造函数不可实现继承，因为忽略对this的修改
*/