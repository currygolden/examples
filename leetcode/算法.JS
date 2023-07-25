/*
 * 参考阅读
 * 1. https://github.com/ConardLi/awesome-coding-js/blob/master/%E7%AE%97%E6%B3%95%E5%88%86%E7%B1%BB/%E6%8E%92%E5%BA%8F/%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F.md
 * 2. https://labuladong.github.io/algo/di-ling-zh-bfe1b/xue-xi-sua-01220/
 *
 * 框架思维（模版代码）
 * 1. 数据结构总体可以分为数组和链表
 * 2. 对常见数据结构的操作是有框架和模版的，无非是在此基础上拓展
 * 3. 从「二叉树」系列问题开始刷，结合框架思维，把树结构理解到位，然后再去看回溯、动规、分治等算法专题，对思路的理解就会更加深刻。
 * 4. 抓主要矛盾，事情的本质，形的内容是无穷尽的
 *
 * ======= 刷题的目的是什么 =======
 * 1. 确定你要通过LeetCode来提升哪些方面的能力，是算法理解、编码能力、时间复杂度和空间复杂度分析还是解决问题的思维方式等。
 * 总体目录如下
 * 1. 排序算法
 *
 *
 *
 *
 * 10.二叉树
 *    10.1 二叉树的核心是掌握两种思维框架
 *        1. 是否可以通过遍历一遍二叉树得到答案？如果可以，用一个 traverse 函数配合外部变量来实现。
 *        2. 是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案？如果可以，写出这个递归函数的定义，并充分利用这个函数的返回值。
 *        3. 无论使用哪一种思维模式，你都要明白二叉树的每一个节点需要做什么，需要在什么时候（前中后序）做。
 *    10.2 后序遍历的特殊性
 *        1. 对于拆解子树的问题，往往结合后序遍历，此时不仅有根节点还有返回值
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
 *      12.1.6 原地删除排序数组的重复项（快慢指针）
 *        1. 什么是原地删除，假如使用splice删除，会引起后续元素移动 二阶时间复杂度
 *        2. 通过给重复元素赋值，起到删除作用
 *        3. 双指针+赋值操作
 *        4. 图形化理解双指针的流程
 *        5. 数组的题型一般都可以解出来，但是遇到原地xx的描述参考快慢指针
 *    12.2 特殊排序
 *      12.2.1 将数组排序成最小的数
 *
 *  ========== 常用技巧 ==========
 *  1. 快慢指针
 *    1.1 快慢指针的代码模版
 *    1.2 常见应用场景
 *  2. 左右指针
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
 * 1. 二叉树的遍历，递归&迭代写法
 * 2. 判断两个二叉树是否完全相同
 * 3. 判断二叉树是否镜像
 * 4. 判断二叉树是否轴对称
 * 5. 实现二叉树的翻转

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
 * 2. 单向链表反转
 *
 *
 *
 */
