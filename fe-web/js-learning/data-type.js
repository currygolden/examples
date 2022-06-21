/*
 * @Author: your name
 * @Date: 2022-03-14 11:08:38
 * @LastEditTime: 2022-06-21 18:52:08
 * @LastEditors: liyu liyu38@meituan.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/fe-web/js-learning/data-type.js
 */

/**
 * js的数据类型
 * 1. 原始类型：number string boolean symbol null undefined
 * 2. 引用类型：object array function date reg math
 * 	2.1 数据是如何存储的
 * 	2.2 赋值操作和深浅拷贝
 * 3. 函数参数传值的讨论
 * 4. 不建议用new来创建基本类型的包装类 Number,String等
 * 5. 0.1+0.2为什么不等于0.3 在价格运算的类型中经常会碰到
 *  5.1 双精度64位浮点
 *  5.2 对于数据计算是否有业务实践
 * 6. js 的数据类型判断
 *  6.1 typeof 返回类型的string,但对于引用数据类型，除了函数之外，都会显示"object"
 *  6.2 p1 instanceof Person,判断A是否为B的实例
 *  6.3 Object.prototype.toString.call(val)
 *  6.4 类型检测的工具函数
 * 7. 数据类型转换
 *  7.1 转换成数字，转换成布尔值，转换成字符串只存在三种
 *  7.2 对象转原始类型，如果Symbol.toPrimitive()方法，优先调用再返回，调用valueOf()，如果转换为原始类型，则返回，调用toString()，如果转换为原始类型，则返回，如果都没有返回原始类型，会报错
 * 8. js的 GC 机制
 * 	8.1 栈内存而言，当ESP指针下移，也就是上下文切换之后，栈顶的空间会自动被回收
 * 	8.2 对象类型的数据在JS中都是通过堆进行空间分配的
 * 		8.2.1 新生代就是临时分配的内存，存活时间短
 * 			Scavenge算法
 * 		8.2.2 老生代是常驻内存，存活的时间长
 * 			标记阶段,清除阶段
 * 9. v8是如何执行js 文件
 * 	9.1 生成 AST 词法分析和语法分析
 * 	9.2 函数执行阶段即 生成执行上下文，关于执行上下文，入栈出栈的流程
 * 	9.3 字节码到机器码（被机器识别）
 * 		9.4.1 通过 V8 的解释器(也叫Ignition)来生成字节码
 * 		9.4.2 代码编译成机器码保存起来，这个用来编译的工具就是V8的编译器(也叫做TurboFan)
 * 		9.4.3 由解释器逐行执行字节码，遇到热点代码启动编译器进行编译，生成对应的机器码, 以优化执行效率
 * 			字节码跟编译器和解释器结合的技术，我们称之为即时编译, 也就是我们经常听到的JIT
 */

 /**
  * 原型+原型链
  * 1. 访问一个对象的属性一直到 Object.prototype原型顶层
  * 2. person.__proto__ == Person.prototype
  *  2.1 Person.prototype.constructor == Person
  *  2.2 Object.getPrototypeOf(person) === Person.prototype
	*  2.3 getter/setter Object.defineproperty
  */

	/**
	 * 1. JavaScript 采用的是词法作用域，也就是静态作用域，函数的作用域在函数定义的时候就决定了
	 * 2. 作用域是指程序源代码中定义变量的区域。（可访问变量的范围）
	 * 3. Execution context stack（执行上下文栈）
	 *  3.1 当执行到一个函数的时候，会创建执行上下文，若函数调用函数就会嵌套上下文，最后一个有结果才会出栈（递归场景）
	 *  3.2 用伪代码描述 执行上下文栈的流程
	 *  3.3 执行上下文
	 * 		3.3.1 变量对象(Variable object，VO)
	 * 		 执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明
	 * 		 arguments
	 * 		 函数的所有形参 (如果是函数上下文)，如果有会被赋初始值
	 * 		 函数声明
	 *     变量声明
	 * 		3.3.2 作用域链(Scope chain)
	 * 		3.3.3 this
	 *  3.4 闭包
	 * 		3.4.1 闭包是指那些能够访问自由变量的函数
	 * 		3.4.2 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量
	 */


 /**
  * @description: 模拟实现 instance 方法
  * 1. 原始类型直接false
  * 2. 对象的原型一直往上
  * @param {*} left
  * @param {*} right
  * @return {*}
  */
 function shimInstanceof(left, right) {
    if(typeof left !== 'object' || typeof left === null) return false
    let proto = left.__proto__
    // 获取对象原型的方法
    // let proto = Object.getPrototypeOf(left);
    while(true) {
        if(proto === null) return false
        if(proto === right.prototype) return true
        proto = left.__proto__
    }
 }
