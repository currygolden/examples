/*
 * @Author: your name
 * @Date: 2022-03-11 19:58:28
 * @LastEditTime: 2022-07-06 20:14:14
 * @LastEditors: liyu liyu38@meituan.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/leetcode/算法.JS
 * 参考阅读
 * 1. https://github.com/ConardLi/awesome-coding-js/blob/master/%E7%AE%97%E6%B3%95%E5%88%86%E7%B1%BB/%E6%8E%92%E5%BA%8F/%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F.md
 *
 *
 * 总体目录如下
 * 1. 排序算法
 *
 *
 *
 *
 * 10.二叉树
 * 11.字符串
 *    11.1 常见正则模式
 *    11.2 字符串本身方法/场景case和边界问题
 *    11.3 字符串的全排列
 * 12.数组
 *    12.1 双指针
 *      12.1.1 数组中调整奇偶数顺序
 *      12.1.2 递增数组寻找两数和为S，乘积最小
 *      12.1.3 和为S的连续序列
 *      12.1.4 N数之和
 *      12.1.5 连续子向量的最大值
 *    12.2 特殊排序
 *      12.2.1 将数组排序成最小的数
 * 13. 二叉树
 *    树的结构&节点的结构
 *    13.1 实现一个二叉树
 *    13.2 三种方式&2 遍历二叉树
 *    13.3 根据遍历结果重建二叉树
 *
 *
 */



/* 排序算法 ********************************************** */
/**
 * @description: 排序数组的二分查找
 * 1. 明确结果成立的条件
 * 2. 获取数组中点 (end-start)>> 1 + start
 * 3. time o(1) space O(logn)
 * @param {*} arr
 * @param {*} target
 * @return {*}
 */
function binarySearch(arr = [], target) {
  const len = arr.length
	let left = 0, right = n-1, res = n
	while(left <= right) {
    let mid = ((right - left) >> 1) + left
    // 		let mid = Math.floor((right + left) / 2)
		if (target ===  arr[mid]) return mid
		if (target < arr[mid]) right = mid -1
		if (target > arr[mid]) left = mid +1
	}
	return 0
}
/**
 * @description: 冒泡排序
 * 1. 相邻元素比较，交换顺序
 * 2. 当前无冒泡，则已经有序
 * 3. o(n^2) o(1) 稳定
 * @param {*} arr
 * @return {*}
 */
function bubbleSort(arr) {
  if (arr.length < 2) return arr
  // 遍历的次数
  for (let i = 0; i < arr.length; i++) {
    let flag = true
    // 每一次需要遍历的元素
    for (let j = 0; j < arr.length - i; j++) {
      // js元素交换写法
      if (arr[j] > arr[j+1]) {
        let tmp = arr[j+1]
        arr[j+1] = arr[j]
        arr[j] = tmp
        flag = false
      }
    }
    if (flag) break
  }
  return arr
}


/**
 * @description: 快速排序
 * 1. 找到基准元素，按大小排序
 * 2. 分治递归处理
 * 3. 递归注意退出条件
 * O(nlogn) O(nlogn) 不稳定
 * @param {*} arr
 * @return {*}
 */
function quickSortV1(arr) {
  if (arr.length < 2) return arr
  const left = []
  const right = []
  for (let i = 1; i < arr.length; i++) {
    const target = arr[0]
    if (arr[i] < arr[0]) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSortV1(left).concat([target], quickSortV1(right))
}

/**
 * @description: 插入排序
 * 1. 左侧看作有序
 * 2. 插入元素跟左侧比较，交换位置
 * 3. 记住插入位置，下次
 * @param {*} arr
 * @return {*}
 */
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let target = i
    for (let j = i - 1; j >= 0; j--) {
      if (arr[target] < arr[j]) {
        // 交换顺序或者左边插入数据
        [arr[target], arr[j]] = [arr[j], arr[target]]
        // 记录交换后元素的位置
        target = j
      } else {
        // 左侧默认是有序的，可以提前结束本次循环
        break
      }
    }
  }
  return arr
}
/**
 * @description: 选择排序
 * 1. 每次找到最小元素跟左侧元素交换
 * @param {*}
 * @return {*}
 */
function findSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i
    for (let j = i+1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    let tmp = arr[minIndex]
    arr[minIndex] = arr[i]
    arr[i] = tmp
    // js语言可以简单的赋值，不用开辟空间
    // [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}
/**
 * @description: 归并排序
 * 1. 先拆分，在两两合并排序
 * 2. 递归考虑到退出条件
 *  nlogn
 * @param {*}
 * @return {*}
 */
function mergeSort(arr) {
  if (arr.length < 2) return arr
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0,mid)
  const right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const result = []
  // 存在3个while
  while(left.length && right.length) {
    if (left[0] <= right[0]){
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while(left.length) {
    result.push(left.shift())
  }
  while(right.length) {
    result.push(right.shift())
  }
  return result
}

/* 二叉树部分 ***************************************************** */



/**
 * @description: 二叉树部分

 */


/**
 * @description: 字符串
 *
 */




/**
 * @descriptionn 栈和队列
 * 1. 有效的括号：重点理解括号进出栈的行为
 *
 *
 *
 */



/**
 * @descriptionn 链表
 * 1. 合并有序链表：
 *
 *
 *
 */
