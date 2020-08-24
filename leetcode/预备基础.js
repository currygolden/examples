// 参考阅读 https://juejin.im/post/5ed32e0151882542fd351696#heading-158
// https://juejin.im/post/5d5b307b5188253da24d3cd1

// 第一系列刷题 http://www.conardli.top/docs/dataStructure
// 回顾系列刷题 https://juejin.im/post/5e2f88156fb9a02fdd38a184


// =======字符串系列
// '(', ')', '{', '}', '[' and ']'一类标签是否输入合理

/* 
  @param {string} s
  @return {boolean}
  和html的标签闭合规则比较类似
*/
var isValid = function(str) {
  const stack = []
  // 一般for in需要hasownproperty来排除原型属性
  for (let i in str) {
    const p = str[i]

    // 左标记入栈
    if (['(', '[', '{'].indexOf(p) > -1){
      stack.push(p)
    } else {
      // 取栈顶元素,需要等于栈顶对应map的值
      const peak = stack.pop()
      if (p !== mapper[peak])
      return false
    }
  }
  // 如果栈数据没有出完，false
  if (stack.length > 0) return false
  return valid
}


/* 
寻找字符串的最长子串长度

*/
var getMaxStr = function(str) {
  if (!str) return ''
  let arr = []
  let max = 0

  for (let i = 0; i < str.length; i++) {
    let idx = arr.indexOf(str[i])
    if (idx > -1) {
      // 删除
      arr.splice(0,index+1)
    } else {
      arr.push(str[i])
    }
    max = Math.max(max, arr.length)
  }
  return max
}



import { func } from "prop-types";

// https://felxy.github.io/blog/2017/06/01/DFS-BFS/
// DFS-BFS遍历Dom结构

/* 
  递归，从根节点开始访问子元素
  node: 实际dom结构
  需要注意通过document.getElement之类的方法获取dom数据为arrayLike
  遍历的格式三段式
*/
const DFS = (node) => {
  if (!node) return
  // 节点的层级
  let deep = arguments[1] || 1
  // do somthing 这里是每一次递归操作里需要做的
  if (!node.children.length) return

  // 先转化为数组
  Array.from(node.children).forEach(item => DFS(item, deep+1))
}

/* 
  BFS将同一层级的数据放入队列
  再按FIFO的顺序取出
*/
const BFS = (node) => {
  if (!node) return
  // 初始化队列结构
  let quene = []
  quene.push({
    item: node,
    level: 1
  })
  while(quene.length) {
    let tmpObj = quene.shift() || {}
    let tmpChildren = tmpObj.item.children || []
    let tmpLevel = tmpObj.level || 1
    // 执行某个操作
    console.log(tmpObj.item.tagName,tmpObj.level)
    if (tmpChildren.length) {
      // 注意获取的dom这里不是数组
      tmpChildren.forEach(obj => {
        quene.push({
          item: obj,
          level: tmpLevel+1
        })
      })
    }
  }
}
let htmlObj = document.getElementById('container')
BFS(htmlObj)



/* 
计算时间间隔内的有效日期
day1 = '2020-01-02'
*/
function rangeDay(day1, day2) {
  const res = []
  const dayTime = 24*60*60*1000
  const startTime = day1.getTime()
  const range = day2.getTime() - startTime
  if (!day1 || !day2) return res
  let total = 0
  while (total <= range && total > 0 ) {
    res.push(new Date(startTime + total).toLocaleDateString().replace(/\//g, '-'))
    total += dayTime
  }
  return res
}

// 用 setTimeout 模拟 interval
setTimeout(function func(){
  setTimeout(() => {
    func()
  }, 50)
})


// 实现dialog类
class Dialog {
  constructor(title, content, left = 0, top = 0) {
    this.title = title
    this.content = content
    this.left = left
    this.top = top
  }

  createDom() {
    this.dom = document.createElement("div")
    let myH1 = document.createElement("h1")
    myH1.innerHTML = this.title
    let myP = document.createElement("p")
    myP.innerHTML = this.content
    // 添加到dom元素下
    this.dom.appendChild(myH1)
    this.dom.appendChild(myP)
    // 定义定位样式
    this.dom.style.left = this.left + 'px'
    this.dom.style.right = this.right + 'px'
    this.dom.className = 'dialog'

    document.body.appendChild(this.dom)
    debounce(this.addDragEvent())
  }

  addDragEvent() {
    // 目标元素绑定事件
    this.dom.onmousedown = function(e) {
      // 处理 up 和 move事件
      let startX = e.clientX
      let startY = e.clientY
      let left = this.offsetLeft
      let right = this.offsetTop

      // document 执行逻辑
      document.onmousemove = (e) => {
        // e 会定位到执行的dom元素
        let moveX = e.clientX
        let moveY = e.clientY
        // 终点 - 起点
        this.style.left = left + (moveX - startX) + 'px'
        this.style.right = right + (moveY - startY) + 'px'

      }

      document.onmouseup = (e) => {
        document.onmousemove = document.onmouseup = null
      }
    }
  }
}


// async函数避免无谓的异步阻塞
async function main() {
  // 可以看作是同时发起三个异步任务
  const x = wait();
  const y = wait();
  const z = wait();
  await x;
  await y;
  await z;
}

// js实现多行文字 省略号展示
function handleMulLine() {
  // 获取dom容器
  let box = document.getElementById('text')
  let tmpStr = box.innerHTML || ''
  let H = box.offsetHeight // dom容器高度
  
  for (let i = 0; i < tmpStr.length; i++) {
    box.innerHTML = tmpStr.substring(0, i)
    // 比较容器高度和滚动高度
    if (H < box.scrollHeight) {
      box.style.overflow = 'hidden'
      box.innerHTML = tmpStr.substring(0,i-3) + '...'
      break;
    }
  }
}


// 数组求和，斐波拉契
function add(arr) {
  let res = []
  res = arr.reduce((item, next, index, allItem) => {
    return item + next
  },0)
  return res
} 

// 获取html中的最大标签数
function getTagMap(root) {
  if (!root) return 0
  let tagMap = {}
  if (tagMap[root.tagName]) {
    tagMap[root.tagName]++
  } else {
    tagMap[root.tagName] = 1
  }
  if (root.children) {
    getTagMap(root.children)
  }
}

// 平级数据转树形数据
function listToTree(list = []) {
  var map = {} 
  var resArr = []
  // 根据map的id来记录数据
  // 这里同时起到了去重的作用
  for (let i = 0; i < list.length ; i++) {
    let item = list[i] || {}
    map[item.id] = item
    item.children = []
  }

  for (let obj of Object.values(map)) {
    if (!obj.Pid) {
      resArr.push(obj)
    } else {
      // 找到对应的上级元素
      const parent = map[obj.Pid]
      parent.child = []
      parent.child.push(obj)
    }
  }
  return resArr
}

// 树形数据转平级数据 借助bfs - 队列
function treeToList(tree = []) {
  var queen = []
  var resList = []
  queen = queen.concat(tree) || []
  while(queen.length) {
    var first = queen.shift()
    if (first.children) {
      queen.concat(first.children)
      delete first['children']
    }

    resList.push(first)
  }
  return resList
} 


// 转化对象嵌套key格式
function transformKey(obj = {}) {
  // 获取value类型
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof(item) === 'object') {

      } else {
        
      }
    }
  }
  
}

// 处理url
function handleUrl(str = '') {
  let strList = str.split('&')
  return strList[3]
}


function addNum(nums = [], target = n) {
  for (let i = 0; i < nums.length; i++) {
    let val = nums[i]
    let gap = n - val || 0
    let idx = nums.indexOf(gap)
    if (idx > -1) {
      return [i, idx]
    }
  }
}


// 扫描文件，批量读取并上传（创建读写流），结合webpack配置cdn

/* 
webpack loader/plugin 实现
loader实现参考：
https://juejin.im/post/5a698a316fb9a01c9f5b9ca0#heading-19
https://champyin.com/2020/01/28/%E6%8F%AD%E7%A7%98webpack-loader/
1: loader实现，单一功能，整体是一个模块，导出是一个函数
2: 在webpack中的配置例子及参数解释
*/

// 帮助读取loader的options配置
const loaderUtils = require('loader-utils')
import { validateOptions } from 'schema-utils';

function myWebpackLoader(suource) {
  const options = loaderUtils.getOptions(this)
  const callback = this.async() // 定义为异步处理的loader

  // 处理source，返回结果
  this.callback(null, result)

  // 如果是最后的loader，需要输出js
  return 'module.exports = ' + JSON.stringify(source);

}

/* 
plugin 实现参考
https://champyin.com/2020/01/12/%E6%8F%AD%E7%A7%98webpack-plugin/

*/
















// 算法系列算法系列算法系列算法系列算法系列算法系列算法系列
/* 
1: 冒泡排序
*/
function bubbleSort(array) {
  // 冒泡次数
  for (let j = 0; j < array.length; j++) {
    // 引入冒泡标志，作为优化
    let complete = true
    // 一次冒泡流程
    for (let i = 0; i < array.length-1-j; i++) {
      if (array[i] > array[i+1]) {
        // 二者交换
        [array[i], array[i+1]] = [array[i+1], array[i]]
        complete = false
      }
    }
    // 一次流程中未冒泡,说明排序完成
    if (complete) {
      break
    }
  }
  return array
}

/* 
2: 选择排序
每次选择找到最小的元素放在最前面

*/
function selectSort(array) {
  // 比较次数
  for (let i = 0; i < array.length - 1; i++) {
    // 当前最小位置
    let aimIndex = i
    // 一次遍历后找到最小的位置
    for (let j = i+1; j < array.length; j++) {
      if (array[j] < array[i]) {
        aimIndex = j
      }
    }
    [array[i], array[aimIndex]] = [array[aimIndex], array[i]]
  }
  return array
}

/* 
快速排序
寻找基础元素，分治
*/
function qucikSort(array) {
  if (array.length < 2) {
    return array
  }
  const target = array[0]
  const left = []
  const right = []

  for(let i = 0; i < array.length; i++) {
    if (array[i] < target) {
      left.push(array[i])
    } else {
      right.push(array[i])
    }
  }

  return qucikSort(left).concat([target], qucikSort(right))
}



// ============ 栈和队列








// ============== 二叉树 =======================
/** 
 * 重点掌握遍历，非递归实现
 * DFS BFS
 * 整理几个典型场景
 * @params {Object} pre
 * 
 * 提供前序，中序，需要重构二叉树
 * 
 * 思路还是递归，获取左子树的前序，中序，以及右子树的前序，中序，长度为一的时候实例化节点
 * 
*/
function generateTree(pre, mid) {
 if (pre.length === 0) return null
 if (pre.length === 1) {
   return new TreeNode(pre[0])
 }

 const value = pre[0] // 根节点
 const index = mid.indexOf(value) // 分界点，也是前序的长度
 // 左右的中序
 const midLeft = mid.slice(0, index)
 const midRight = mid.slice(index+1)
 // 左右的前序
 const preLeft = pre.slice(1, index+1)
 const preRight = pre.slice(index+1)
 // 由根节点实例化一棵树
 const node = new TreeNode(value)
 node.left = generateTree(preLeft, midLeft)
 node.right = generateTree(preRight, midRight)
}


/**
 * 二叉树的三种遍历 + 非递归实现
 * 递归类型写一种
 * 
 * root代表二叉树
 */
  function preOrderTree(root, result = []) {
    if (root.length === 0) return
    result.push(root.value)
    preOrderTree(root.left)
    preOrderTree(root.right)

    return result
  }

  // 非递归实现,借助栈
  function preOrderTree2(root) {
    const res = []
    const satck = []
    let current = root
    // 存在二叉树，或者有压栈操作
    while(current || stack.length > 0) {
      // 前序是获取值，入栈，拿左树
      // 对目标单元的处理
      while(current) {
        res.push(current.value)
        stack.push(current)
        current = current.left
      }
      // 表示左边处理完
      current = stack.pop()
      current = current.right
    }
    return res
  }

 /**
  * 二叉树的镜像
  * 
  */

  function mirror(root) {
    if (root) {
      // 值交换借助第三方变量
      const temp = root.right
      root.right = root.left
      root.left = temp
      // 递归处理子树
      mirro(root.left)
      mirro(root.right)
    }
  }


  /** 
   * 二叉树的按层遍历
   * 1: 类似遍历dom树或者相似的树形结构数据
   * 2: 了解队列实现的过程就不难
   * 
  */
  const layerRunTree = (root) => {
    // 如果需要添加层级，好处理
    if (!root) return
    let quene = []
    let res = []
    quene.unshift(root)
    while(quene.length) {
      const tmpNode = quene.shift() || {}
      res.push(tmpNode.value)
      // 左右树入队列
      quene.push(tmpNode.left)
      quene.push(tmpNode.right)
    }
    return res
  }






















// ==============数据结构
/* 
========= 数组 =========
双指针
ruduce迭代

*/
// 寻找两数之和 
function getPlusNum(s, arr) {
  for (let i = 0; i < arr.length; i++) {
    let pre = arr[i]
    let next = s - arr[i]
    let idx = arr.indexOf(next)
    if (idx > -1) {
      return [pre, next]
      break
    }
  }
}

/* 
输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，如果有多对数字的和等于S，输出两个数的乘积最小的。
1: 数组递增
2: 乘积最小

维护双指针，从两端往中间找
一般处理数组或者字符串用双指针降低复杂度
*/
function getPlusNum(array,s) {

  let min = 0
  let max = array.length - 1
  while (min < max) {
    let sum = array[min] + array[max]
    if (sum > s) {
      max -= 1
    } else if (sum < s) {
      min += 1
    } else {
      // 最先拿到的最小
      return [array[min], array[max]]
    }
  }
}

/* 
输入一个正数S，打印出所有和为S的连续正数 序列
这道题相对比较有难度
当前序列与总和S的三种情况，维持当前序列还是需要有快慢指针
*/
function getConsist(s) {

}


/* 
输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分

考虑降低空间复杂度
*/
function changeOrderList(array) {
  let singleList = []
  let resList
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 > 0) {
      singleList.push(array[i])
      array.splice(i,1)
      i--
    }
  }
  return resList = singleList.concat(array)
}

/* 
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标
*/


/* 
寻找第一个只出现一次的字符
*/















/* 
=============栈和队列===============


*/

/* 
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效
*/

/* 
将多维数组转化为一维数组

1: 递归场景
2: toString
3: reduce
*/




const getTrapMax = (arr = [], k = 0) => {
  let i = 0
  let res = []
  while(i < arr.length - 2) {
    for (let j = i; j < i+4; j++) {
      let tmp = ''
      if (arr[j] < arr[j+1]) {
        // 冒泡
        tmp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = tmp
      }
      res.push(arr[j])
    }
    i++
  }
  return res
}

