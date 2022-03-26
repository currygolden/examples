/*
 * @Author: your name
 * @Date: 2022-03-11 19:58:28
 * @LastEditTime: 2022-03-25 20:43:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/leetcode/算法.JS
 * 参考阅读
 * 1. https://github.com/ConardLi/awesome-coding-js/blob/master/%E7%AE%97%E6%B3%95%E5%88%86%E7%B1%BB/%E6%8E%92%E5%BA%8F/%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F.md
 */




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
    for (let j = i - 1; j >= 0; j--) {
      if (arr[i] < arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
  return arr
}
