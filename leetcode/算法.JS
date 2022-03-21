/*
 * @Author: your name
 * @Date: 2022-03-11 19:58:28
 * @LastEditTime: 2022-03-14 19:13:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/leetcode/算法.JS
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
