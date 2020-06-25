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

// 扑克牌问题



// 
function getNum() {
  let count = 0
  for (let i = 0; i< 4000000; i++) {
    if ((i+'').indexOf('1') > -1) {
      count ++
    }
  }
  return count
}

// 数组求和，斐波拉契
function add(arr) {
  let res = []
  res = arr.reduce((item, next, index, allItem) => {
    return item + next
  },0)
  return res
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