/*
 * @Author: your name
 * @Date: 2022-03-10 10:29:21
 * @LastEditTime: 2022-03-11 19:53:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/leetcode/数据结构.js
 */

/**
 * 参考阅读
 * 数组
 * 1. 了解es5/es6常见数组方法，是否修改原数组，代码的简洁程度
 * 2. 如何跳出循环
 *  2.1 break/continue处理for /for of / for in
 *  2.2 map/forEach/some/every 退出遍历
 *   2.2.1 map/forEach break/return 均不可以
 *   2.2.2 some: 有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测(用作跳出循环条件)
 *   2.2.3 every: 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测
 *  2.3 常见数组方法的原生实现
 * 3. 遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制
 *  3.1 遍历器对象本质上是一个指针对象，包含next方法，调用返回一个包含value和done两个属性
 *  3.2 一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”，该属性调用返回遍历器对象,obj[Symbol.iterator]
 * 4. 常见case
 *  4.1 类数组转换，快速索引，迭代，递归，遍历
 */



/**
 * @description: flat 嵌套数组 遍历（dfs/bfs）&迭代& 边界场景
 * @param {*} arr
 * @param {*} depth
 * @return {*}
 */

function arrayFlat(arr, depth) {
  if(depth < 1) return arr
  return arr.reduce((cur, next) => {
      Array.isArray(next) ?
      cur = cur.concat(arrayFlat(next, depth -1)) :
      cur.push(next)
      return cur
  }, [])
}

const arr = [1,2,3,4,[1,2],[1,3,4], [1,[1,2,,3]]]
// const res =  arr.flat(1)
// console.log(arrayFlat(arr, 1))

/**
 * @description: 模拟实现数组map, 关键：需要把this转为对象，将原型上的属性map一片
 * @param {*} callbackFn
 * @param {*} thisArgs
 * @return {*} array
 */
Array.prototype.map = function(callbackFn, thisArgs) {
  // 检查 this 异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  // 检查callback(直接toString可能会报错)
  if (Object.prototype.toString.call(callbackFn) !== "[object Function]") {
    throw new TypeError(callbackfn + ' is not a function')
  }
  let O = Object(this)
  let T = thisArgs
  let A = new Array(O.length)
  for (let k = 0; k < O.length; k++) {
    if (k in O) {
      let kvalue = O[k]
      let mappedValue = callbackFn.call(thisArgs, kvalue, k, O)
      A[K] = mappedValue
    }
  }
  return A
}

/**
 * @description: 模拟实现reduce
 * 1. 累计值，下一位，索引，数组
 * 2. 边界状态
 * 3. 回调函数的参数值判断
 * 4. 不改变原数组
 * @param {*} callbackFn
 * @param {*} initValue
 * @return {*}
 */
Array.prototype.reduce = function(callbackFn, initValue) {
  let callback = arguments[0]
  console.log('callback22:', callback)
  if (Object.prototype.toString.call(callback) !== ['object', 'Function']) {
    throw new Error(callback + 'is not a function')
  }
  let O = Object(this)
  let initCalValue = !initValue ? O[0] : initValue

  for (let K = initValue ? 0 : 1; K < O.length; K++) {
    // 包含原型上的属性
    if (K in O) {
      console.log('initCalValue:', initCalValue)
      console.log('next:', O[K])
      initCalValue = callbackFn(initCalValue, O[K], K, this)
    }
  }
  return initCalValue
}

/**
 * @description: 模拟实现filter
 * 1. 筛选满足回调的数据
 * 2. 不改变原数组
 * 3. 数组转对象，包括原型属性
 * 4. 参数错误验证
 * 5. filter之后的索引会变
 * 6. 绑定this
 * @param {*} callbackFn
 * @return {*}
 */
Array.prototype.filter = function(callbackFn, thisArgs) {
  console.dir('fn:', callbackFn)
  let o = Object(this)
  let A = []
  let len = 0
  for (let k = 0; k < o.length; k++) {
    if (k in o) {
      let flag = callbackFn.call(thisArgs, o[k], k)
      if (flag) {
        A[len++] = o[k]
      }
    }
  }
  return A
}
const arr2 = [1,2,3,4,5,6]
arr2.filter(item => item > 9)
// console.log('arr233:', arr2)

/**
 * @description: 模拟实现push
 * 1. null&undefined 均可push
 * 2. 不定长参数
 * 3. 超出最大长度
 * 4. 返回值
 * @param {*} val
 * @return {*}
 */
Array.prototype.push = function(...val) {
  let o = Object(this)
  let len = o.length || 0
  for (let k = 0; k < val.length; k++) {
    o[len+k] = val[k]
  }
  let newLen = len + val.length
  return newLen
}
/**
 * @description: 
 * 1. idx支持负数，0 - len-1,大于len-1
 * 2. 会修改原数组
 * 3. 返回值为删除元素数组
 * @param {*} function
 * @param {*} idx 开始位置
 * @param {*} num 删除个数
 * @param {array} val 剩余参数
 * @return {*}
 */
Array.prototype.slice = function(idx, num, ...val) {
  let o = Object(this)
  let len = o.length || 0
  let res = []
  let pre = []
  let last = []
  if (idx < 0) idx = len + idx
  for (let k = 0; k < len; k++) {
    if (k in o) {
      if (num === 0) 
      // 保留数据
      k < idx && pre.push(o[k])
      // 删除数据
      k > idx-1 && k < idx + num && res.push(o[k])
      last.push(o[k])
    }
  }
  o = pre.concat(val, last)
  return res
}