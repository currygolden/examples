// 使用ts 包括类型思维和面向对象
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