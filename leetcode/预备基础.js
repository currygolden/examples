// 参考阅读 https://juejin.im/post/5ed32e0151882542fd351696#heading-158
// https://juejin.im/post/5d5b307b5188253da24d3cd1

// 第一系列刷题 http://www.conardli.top/docs/dataStructure
// 回顾系列刷题 https://juejin.im/post/5e2f88156fb9a02fdd38a184


// =======字符串系列  第一节
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
  const startTime = new Date(day1).getTime()
  const range = new Date(day2).getTime() - startTime
  if (!day1 || !day2) return res
  let total = 0
  while (total <= range) {
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

// 返回两数之和 等于目标值
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

/* 实现链式调用
  promise支持
  比如 js 字符串函数支持
  webpack

*/
 function ChainStuff() {
   this.a = 1
   this.b = 2
 }
 // 这里用箭头函数就会导致问题
 ChainStuff.prototype.speak = function() {
    console.log(this.a)
    return this
 }
 ChainStuff.prototype.say = function() {
  console.log(this.b)
  return this
}
new ChainStuff().speak().call()


/* 
  实现函数的curry,简单介绍场景
  感觉没有实际场景
*/
  function hackCurry() {

  }


/* lodash.get
  实现连续取值的兼容 | 避免报错
  正则替换 | for of 遍历数组
*/
  function hackLodashGet(source, path, defaultValue) {
    // 处理路径成数组的格式，替换数字
    const pathArr = path.replace(/\[(\d+)\]/g, ".$1").split('.') || []
    let result = source || {}
    for (let p of pathArr) {
       result = Object(result[p]) 
       if (result == undefined) {
         return defaultValue
       }
    }
  }

/* 
  实现发布订阅模式
  与观察者模式对比，存在一个调度中心
  参考vue的组件通信事件机制
*/
  class pubSub {
    // 调度中心
    constructor() {
      // key: eventName, value: []
      this.dispatcher = {}
    }
    // 监听
    on(eventName, fn) {
      this.dispatcher[eventName] = this.dispatcher[eventName] || []
      // 同一个事件可以有多个监听者
      this.dispatcher[eventName].push(fn)
    }
    // 通知更新
    emit(eventName, data) {
      this.this.dispatcher[eventName].forEach(fn => {
        fn(data)
      })
    }
    // 清除订阅
    off(eventName, fn) {
      // 订阅数组中去掉 fn
      if (this.dispatcher[eventName]) {
        const newCache = this.dispatcher[eventName].filter(item => item !== fn)
        this.dispatcher[eventName] = newCache
      }
    }
  }

  /* 
    平级数组转树
    树转平级数组
  */
var list = [
  {
    id: 1,
    vaule: 2,
    parentId: ''
  },
  {
    id: 2,
    vaule: 2,
    parentId: 1
  },
  {
    id: 3,
    vaule: 2,
    parentId: 1
  },
  {
    id: 4,
    vaule: 2,
    parentId: 3
  },
  {
    id: 5,
    vaule: 2,
    parentId: 2
  },
  {
    id: 6,
    vaule: 2,
    parentId: 3
  }
]
/* 
  DFS/BFS都可以
  借助map
*/
  function arrToTree(list = []) {
    // 构建node
    let root = list[0] || {}
    list.shift()
  
    let tree = {
      id: root.id,
      value: root.value,
      children: list.length > 0 ? getTreeArr(list, root.id) : []
    }
    return tree
  }
  function getTreeArr(list = [], id) {
    let res = []
    let len = list.length || 0
    for (let i = 0; i < len; i++) {
      let node = list[i] || {}
      if (node.parentId === id) {
        const obj = Object.assign({}, node, {
          children: getTreeArr(list, node.id)
        })
        res.push(...obj)
      }
    }
    return res
  }

/* 
    遍历dom树，打印节点信息和层级
*/
  function getHtmlMes(obj, id = 1) {
    const rootObj = document.getElementById('aim')
    let quene = []
    let res = []
    quene.push(rootObj)

    while(quene.length) {
      let tmpObj = quene.shift() || {}
      let tagName = tmpObj.tagName || ''
      let className = tmpObj.className || ''
      res.push({
        tagName,className,id
      })
      let tmpChildren = Array.from(tmpObj.children) || []
      if (tmpChildren.length) {
        tmpChildren.forEach(item => {
          quene.push(item)
        })
        id++
      }
    }
    return res
  }

  /* 
  树转平级数据
  BFS遍历的结构非常清晰
  */
  function treeToArr(obj) {
    let quene = [].push(obj)
    let res = []
    
    while(quene.length) {
      let tmpObj = quene.shift() || {}
      const resObj = {
        "id": '',
        "pId": '',
        "name": '',
        "open": ''
      } = tmpObj
      res.push(resObj)
      let children = tmpObj.children || []
      if (tmpObj.children) {
        tmpObj.children.forEach(item => {
          quene.push(item)
        })
      }
    }
    return res
  }

  var obj = {
    id: 1,
    pId: 2,
    name: '111',
    open: false,
    children: [
      {
        id: 1,
        pId: 2,
        name: '111',
        open: false,
        children: [
          {
            id: 1,
            pId: 2,
            name: '111',
            open: false,
          }
        ]
      },
      {
        id: 1,
        pId: 2,
        name: '111',
        open: false,
        children: [
          {
            id: 1,
            pId: 2,
            name: '111',
            open: false
          }
        ]
      }
    ]
  }

  /* 
  点击标签，打印标签名称
  参考 https://juejin.im/post/6844903731079675917 了解dom事件机制
  */
 function sayDomName(e) {
    if (!e) return
    console.log(e.target.nodeName)
 }
 document.getElementById('test').addEventListener('click', sayname, false)

  /* 
  按钮提交，接口防止重复调用
  特别是在订单提交的场景，和防抖还是有区别
  加锁，类似于将按钮loading的方法
  */
  async function sentOnce() {
    if (this.isSent) return

    await function handleSent() {
      this.isSent = true
    }
  }

  /* 
  增删dom元素的class
  element.classList 本身是只读的，但是你可以使用 add() 和 remove() 方法修改它
  */
 function addClass(ele, str) {
  // 先判断有无
  if(!hasClass(ele, str)) {
    ele.classList.add(str)
  }
 }

 function hasClass(ele, str) {
  let res = false
  const tmpList = ele.classList || []
  if (tmpList.contain(str)) {
    res = true 
  }
  return res
 }

 /* 
 实现倒计时功能
 1. 计算间隔时间的d/h/m/s
 2. 对定时器的理解
 3. 如何用 setTimeout 模拟 setInterval
    setTimeout + 递归也可以实现
 */

 // 小于0 补齐
function addZero(i) {
  return +i < 10 ? `0${i}` : `${i}`
}
function countDown() {
  var nowTime = new Date()
  var endTime = new Date("2020/10/25, 18:19:19")
  // 获取间隔秒的时间
  var leftTime = parseInt((endTime.getTime() - nowTime.getTime()) /1000) 
  // 计算日期
  var d = parseInt(leftTime / (24*60*60))
  var h = parseInt(leftTime % (24*60*60) /(60*60))
  var m = parseInt(leftTime % (60*60) / 60)
  var ms = parseInt(leftTime % 60)
  d = addZero(d)
  h = addZero(h)
  m = addZero(m)
  let str = `活动倒计时${d}天${h}时${m}分${ms}秒`
  document.querySelector('.check-img').innerHTML = str
}
setInterval(() => {
  countDown()
},1000)
// 方法2
function fn() {
  setTimeout(() => {
    fn()
  }, time)
}

/* 
 判断html的标签是否闭合

*/

String.prototype.trim() = function() {
  var reg = /^\s?\s$/
  return this.replace(reg, '')
}






// 扫描文件，批量读取并上传（创建读写流），结合webpack配置cdn


/* 
数据相加丢失精度
大数相加
库或者自定义，数据运算需要留意
*/

function minNumAdd(a,b) {
  // 转换成整数,但是这里带来了大数相加的问题
  const pre = (a.toString().split('.')[1] ||'').length
  const end = (b.toString().split('.')[1] ||'').length
  const base = Math.pow(10, Math.max(pre, end))
  return (a*base + b*base) / base
}

function bigNumAdd(a, b) {
  // 先数据用0补齐，记录进1
  let pre = a.toString() || ''
  let end = b.toString() || ''
  let count = 0
  let res = []

  const max = Math.max(pre.length, end.length)
  while(pre.length < max) {
    pre = '0' + pre
  }
  while(end.length < max) {
    end = '0' + end
  }
  console.log('pre:', pre)
  console.log('end:', end)
  // 处理相加
  for (let i = pre.length -1; i > -1; i--) {
    let tmpSum = Number(pre[i]) + Number(end[i]) + count
    console.log('all:', res)
    if (tmpSum > 9) {
      count = 1
    } else {
      count = 0
    }
    res[i] = tmpSum % 10 || 0
  }
  console.log('all:', res)
  if (count === 1) res.unshift('1')
  return res.join('')
}






















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

  /* 
  二叉树的路径求和
  提供二叉树，固定值，获取符合要求的路径
  */
 const getSumPath = (node, sum) => {
  let res = []
  res.push(node.val)
  if (!node) return []
  // 终点
  if (!node.left && !node.right) {
    return node.val === sum
  }
  // 递归处理
  return getSumPath(node.left, sum - node.val) || getSumPath(node.right, sum - node.val)
 }


  /* 
  获取二叉树的最大深度
  */

  const getMaxDepth = (node, depth = 0) => {
    if (!node) return depth
    if (node.left) getMaxDepth(node.left, depth + 1) 
  }






















// ==============数据结构
/* 
========= 数组 =========
双指针
ruduce迭代
实现数组常见方法

*/
/**
 * @description 
 * 寻找两数之和
 * 寻找两数之和，乘积最小
 * 和为s的连续正数序列
 * 连续序列使得和最大
 * 
 * 是否为有序数组，是否可以提前排序，利用map遍历变搜索
 * @param {number} s
 * @param {array} arr
 * @return {array} 
 */
 
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
给定数组，打印拼接的最小数字
定义排序规则
*/
const getMinNum = (arr) => {
  if (!arr) return false
  getMinNum.sort(numSort).join()

  const numSort = (a,b) => {
    const pre = '' + a + b
    const end = '' + b + a
    return pre - end
  }
}
















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



/* 
  hashMap
  例子：缓存库/存储库的设计，实现deepclone



*/

