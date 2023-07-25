/**
 * ts范畴内的核心知识点
 * 如果在形上犹豫，畏惧，说明还是执着于相
 * 1. 基本类型，类型定义等不赘述
 * 2. ts里的函数定义
 * 3. 泛型使用介绍
 * 4. ts的类和继承
 * 5. 什么是类型断言和类型守卫
 *    类型守卫是一种在特定范围内缩小变量的类型范围的方式
 *    常见的类型守卫包括 typeof、instanceof、自定义类型谓词函数等
 * 6. 命名空间，模块等声明方式是做什么（对项目类型系统的约束做了哪些工作）
 * 7. 使用过哪些高级类型和工具类型
 *    7.1 泛型：泛型是一种在编程中用于增强代码灵活性和重用性的机制（避免无意义增加复杂度）
 *    7.2 联合类型（Union Types）和交叉类型（Intersection Types）A|B A&B
 *    7.3 索引类型（Index Types）
 *    7.4 字面量类型（Literal Types）

 * 8. 类型注解和类型推断的区别是什么？
        8.1 类型注解（Type Annotations）**是在代码中显式地指定变量的类型。通过使用冒号（:）后跟类型名称
        8.2 类型推断（Type Inference）**是 TypeScript 根据代码的上下文自动推断变量的类型。
   9.什么是类型体操，做过哪些类型体操推断
        9.1 在 TypeScript 中使用高级类型和类型操作符来推断和操作类型的技巧
        9.2 高级类型如：联合类型、交叉类型、类型保护、映射类型、条件类型、索引类型
        9.3 类型操作符：keyof，typeof,extends,infer,as等
   10.什么是类型声明文件（Type Declaration Files）？为什么需要它们？
      类型声明文件（Type Declaration Files）是一种用于描述 JavaScript 代码中类型信息的文件。它们用于为 JavaScript 库、框架或模块提供类型定义，以便在使用这些库时，TypeScript 能够了解其类型信息，提供类型检查、智能感知和代码提示等功能。
      10.1为什么需要类型声明文件？
        类型检查和类型安全性：类型声明文件允许 TypeScript 在编译时对 JavaScript 代码进行类型检查，以提前发现潜在的类型错误和编码问题，提高代码的健壮性和可维护性。
        智能感知和代码提示：类型声明文件为编辑器提供了准确的类型信息，使得代码编辑器能够在开发过程中提供智能感知、自动完成和代码提示功能，提升开发效率和减少错误。
        文档和可读性：类型声明文件可以作为代码库的文档，帮助开发人员理解库的API、函数签名和类型定义，提高代码的可读性和可理解性。
        在工程项目中设计类型声明文件时，可以采取以下一般性的设计方法：

      使用 .d.ts 扩展名：类型声明文件通常使用 .d.ts 扩展名，例如 myLibrary.d.ts。
      声明全局变量和全局模块：如果库或模块会添加全局变量或全局模块，可以使用 declare 关键字进行声明，以确保 TypeScript 能够正确识别和使用它们。
      导出类型定义：使用 export 关键字将需要暴露的类型定义导出，以便其他代码可以使用它们。
      描述函数和方法签名：在类型声明文件中，准确地描述函数和方法的参数类型、返回类型以及可能的重载情况。
      定义接口和类型别名：使用接口和类型别名来描述对象的结构和类型约束，提供更清晰的类型定义。
      支持模块化导入：如果库或模块需要通过模块化方式导入，在类型声明文件中使用 export 关键字将模块中的类型定义导出，以便在模块化环境中进行使用。

    11.如何使用 TypeScript 进行类型检查和编译？
        配合ts.config.json 编译
    12.如何处理在 TypeScript 中使用第三方库的类型定义不完整或不准确的情况？
        12.1 自行拓展类型文件并发布 npm 包：这个方法适用于你愿意花时间和精力来为第三方库编写类型定义，并且希望将其作为独立的 npm 包发布。你可以创建一个单独的 TypeScript 项目，在其中编写并定义第三方库的类型，并将其发布到 npm 仓库中。这样做的好处是可以让其他开发者直接安装和使用你提供的类型定义包，以获得更好的类型支持和开发体验。
        12.2 在自身业务系统中声明模块：如果你只是想在自己的业务系统中使用第三方库，可以在项目中单独创建一个类型声明文件（通常以 .d.ts 扩展名结尾），并在其中定义第三方库的类型。这种方式的缺点是类型定义无法被其他项目复用，因为它是特定于你的项目的。但它是一种快速解决问题的方法，可以在你的项目中获得基本的类型检查和智能感知。
 *
 *
 *
 *
 */
/*
  类型断言
  未知类型 unknown
  变量-函数类型
*/
let a: string
let b: unknown
a = b as string
a = <string>b

/*
  void 表示空，如函数的返回值
*/
function fn(): void {
}

/*
  对象的定义形式
  key-value关系
  属性可选
*/
let obj: {name: string, age?: number}
obj = { name: '123' }

let obj2: {name: string, [propName: string]: any}
obj2 = {name: '123', age: 9}

/*
  函数的结构声明
*/
let d: (a: number, b: number) => number
d = function(c1: number, c2: number): number {
  return c1 + c2
}

/*
  数组格式
  数据类型
  元组：类型和数量都固定
*/
let e: number[]
let g: Array<string>
e = [1,2,3]

let z: [string, number]
z = ['123', 12]

/* 定义枚举 */

/*
  定义类型别名
  常见类型声明文件
 */
type myType= 1 | 2 | 3 | 4


/*
  避免从ts-js的编译及watch过程，定义config.json
  实际的配置选项见实例
*/


/*
  泛型，定义类型变量
  可以基于接口实现泛型
  type 是已知的类型
  泛型 似乎在调用的时候才可以明确
*/
function fn9<T,K>(a: T, b: K):K {
  return b
}

interface Job{
  name: 'it'
}

function fn7<T extends Job>(a: T): number {
    return 1
}
/**
 * @description 泛型使用介绍
 * 1. 标示函数
 * 2. 可选属性
 * 3. 泛型约束
 *
 */

function identity<T>(arg: T): T {
  return arg;
}
// 使用示例
let result = identity("Hello, TypeScript!"); // result 的类型为 string

interface MyObj<T> {
  value: T;
  optionalValue?: T;
}

// 使用示例
let obj1: MyObj<number> = { value: 42 };
let obj22: MyObj<string> = { value: "Hello", optionalValue: "World" };


interface Lengthwise {
  length: number;
}

function getLength<T extends Lengthwise>(arg: T): number {
  return arg.length;
}

// 使用示例
let strLength = getLength("Hello"); // strLength 的类型为 number
let arrLength = getLength([1, 2, 3]); // arrLength 的类型为 number
