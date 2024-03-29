/* 2021年4月
面试是双向选择，要处理好自己的节奏
面试的核心就是 背题背题背题背题，此外描述好自己的项目，准备3个左右的亮点
这里需要罗列大概会涉及到的问题，具体拆解见其它的目录


1. js 基础（包括js基础系列&js专题&es6）
  1.1 js的数据类型
    小数运算精度丢失
    函数传递参数的类型
    如何理解赋值操作，不同数据在内存的存储，不这么设计会带来什么问题
    常见的类型转换
  1.6
    1.6.1 原型&原型链
      经典原型图，constructor属性
    1.6.2 作用域&作用域链
      JavaScript 采用的是词法作用
      执行上下文的组成：变量对象，作用域链，this
      闭包
      执行栈的压入弹出顺序
    1.6.3 继承实现
      模拟Object.createsh实现
      面向对象的实践
      es6,TS的面向对象
  1.2 函数
    函数的arguments属性
    对各种循环语句的理解
  1.3 ES6+的语法特性
    拓展运算符&rest运算符使用场景
  1.4 异步处理场景
    回调函数的实现（基于发布订阅模式）
    Promise的特点
    分析实现完整的Promise，功能函数
    async/await使用&错误处理封装
  1.5 V8执行js代码的过程
    从js源码到可执行的机器码需要经历 生成AST,生成字节码过渡（直接到机器吗内存消耗大）
    字节码是介于AST 和 机器码之间的一种代码，但是与特定类型的机器码无关，字节码需要通过解释器将其转换为机器码然后执行，于是就产生了即时编译技术（JIT）
    由解释器逐行执行字节码，遇到热点代码启动编译器进行编译，生成对应的机器码, 以优化执行效率
    不去深挖编译和解释的区别，前者目标生成中间文件与平台无关（有点像抽象层），而解释则针对生成机器吗阶段
  1.9 V8如何处理垃圾内存的回收
    64/32位系统对V8内存的分配有限，对于栈内存，执行上下文切换栈顶空间即回收，问题是堆内存的处理
    由于js单线程执行，回收内存耗时会导致其它逻辑等待，因此限制堆内存大小
    新老生代内存的回收算法机制
  1.10 如何理解EventLoop
    主线程上运行的宏任务&微任务,微任务队列可以解决什么问题
    描述浏览器的EventLoop
    描述node.js的EventLoop（搞不太清楚）
2. vue框架
  2.1 项目的vue引入的是runtime 还是runtime+complier，二者区别是
    complier 处理template为render函数，但是vue-loader在构建时可以做包括开发和线上包，所以一般不需要complier
  2.2 vue的核心模块有哪些
    1: 响应式原理
    2: 组件系统
      2.1: 组件化设计的思路
      2.2: 组件通信常用方法
    3: 虚拟Dom
    4: 模版编译
    5: 生命周期
    6: 实例方法/全局api/过滤器/指令/内置组件
  2.5 vue-router
    对 SPA 单页面的理解，它的优缺点分别是什么
    vue-router 是如何实现的
    从vue-router源码可以学到什么
  2.6 如何理解数据驱动
    vue2.x 的数据响应式原理
  2.7 介绍vuex
  2.15
    vue ssr的理解与实践
3. react 框架
4. 工程化专题
  4.1 前端工程化设计与落地
  4.2 项目性能优化
  4.3 监控与大盘指标建设
  4.4 业务关键链路监控建设
  4.5 CI/CD 的标准化
  4.6 线上质量保证与定位
  4.7 全流程生命周期的标准化方案

5. 浏览器专题
  5.1 浏览器的缓存策略
  5.2 html从加载到解析
  5.3 安全策略xss和csrf
6. http&https&tcp专题
  5.1 tcp通信介绍
    5.1.1 TCP&UDP的区别
    5.1.2 三次握手&四次挥手的介绍
    5.1.3 半连接队列和 SYN Flood攻击
    5.1.4 TCP 报文头部字段
    5.1.5 TCP 快速的原理
    5.1.6 时间戳，超时重传，流量控制，拥堵控制，keep-alive
  5.2 如何处理跨域
  5.3 介绍https
  5.4 介绍典型http的结构
7. css 专题

8. 项目专题






*/



var node = document.getElementById('test')
const printHtml = function(root, res = [], level = 0) {
  if (!root) return []
  const tmp = {
    tagName: root.tagName,
    children: root.children || [],
    level: level
  }
  res.push(tmp)
  if (root.children) {
    for (let i = 0; i < root.children.length; i++) {
      tmpLevel = level + 1
      const tmpNode = root.children[i] || {}
      printHtml(tmpNode,res, tmpLevel)
    }
  }
  return res
}

const printHtmllayer = function(root, res = [], level = 0) {
  if (!root) return []
  let quene = [root]
  while(quene.length) {
    const tmpNode = quene.shift()
    const tmp = {
      tagName: tmpNode.tagName,
      children: tmpNode.children || [],
      level: level
    }
    res.push(tmp)
    if (tmpNode.children) {
      for (let i = 0; i < tmpNode.children.length; i++) {
        level = level + 1
        const childNode = tmpNode.children[i] || {}
        quene.push(childNode)
      }
    }
  }
  return res
}

// 前序遍历
const preView = function(root = {}, res = []) {
  res.push(root.val)
  preView(root.left)
  preView(root.right)
}

// 前序遍历
const preViewLayer = function(root = {}) {
  const res = []
  const stack = []
  let current = root

  while(current || stack.length) {
    while (current) {
      res.push(current.val)
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    current = current.right
  }
  return res
}

/* 实现promise
  1. resolve
  2. reject
  3. then - 异步
  4. 链式调用
  5. all race
*/
  const pend = 'pending'
  const reject = 'rejected'
  const fulfilled = 'fulfilled'

  function Myromise(executor) {
    this.state = pend
    this.value = null
    this.reason = null
    this.successCallbacks = []
    this.rejectCallbacks = []

    // 修改状态 传递value 异步执行回调
    const resolve = (value) => {
      setTimeout(() => {
        if (this.state === pend) {
          this.state = fulfilled
          this.value = value
          this.successCallbacks.forEach(cb => {
            cb(this.value)
          })
        }
      })
    }

    const reject = (reason) => {
      if (this.state === pend) {
        this.state = reject
        this.reason = reason
      }
    }
    // 执行 executor
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  Promise.all = function(promiseArr = []) {
    let resArr = []
    let i = 0
    return new Promise((resolve, reject) => {
      function handleRes(obj, idx) {
        resArr.push(obj)
        i++
        if (i === promiseArr.length) {
          resolve(resArr)
        }
      }
      promiseArr.forEach((promiseObj, index) => {
        promiseObj.then(res => {
          handleRes(res, index)
        }).catch(err => {
        })
      })
    })
  }

  Promise.race = function(promiseArr = []) {
    return new Promise((resolve, reject) => {
      promiseArr.forEach(item => {
        item.then((res) => {
          resolve(res)
        })
      })
    })
  }

  Promise.retry = function(fn, times = 5, tryTime = 0) {
    fn().then((res) => {
      Promise.resolve(res)
      // return res
    }).catch(err => {
      if (tryTime < times){
        tryTime++
        Promise.retry(fn, times, tryTime)
      } else {
        reject(err)
      }
    })
  }






/*
整体进度 回顾
1. js 基础体系
2. 前端框架基本知识点
3. css 基本知识点
4. 工程化方案的了解，webpack 的使用经验
5. http/tcp 相关的网络协议
6. 浏览器的常见问题，安全策略等
7. git 工作流，常见git 工作命令
8




手写题
1. call apply bind 实现
2. 实现new
3. 实现深浅拷贝
4. 防抖，节流
5. promise 以及 常见方法的实现
6. 观察者模式
7. instanceof
8. 数组去重，扁平
9. es5的继承

项目的一些重点/难点

*/



/**
 * 项目经历
 * 1. 单车H5项目
 *  1.1 业务梳理
 *  登陆/注册 native
 *  行程页
 *  个人中心
 *  结费页
 *  骑行链路流程页面
 * 2. 难点和挑战
 *  业务挑战无
 *    1. 主要是兼容性
 *    2. C 端业务的主要场景
 *  研发套件支持
 *    1. 公共组件
 *    2. 公共utils/libs
 *    3. 结合业务场景的 cli 工具
 *  构建工具升级 webpack2.x - 4.x
 *  性能优化治理
 *  质量体系建立
 *  CI/CD&部署对标最佳实践
 *
 *
 *
 *
 * */
