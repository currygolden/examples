/* 2021年4月
面试是双向选择，要处理好自己的节奏
面试的核心就是 背题背题背题背题，此外描述好自己的项目，准备3个左右的亮点
这里需要罗列大概会涉及到的问题，具体拆解见其它的目录


1. js 基础
2. 业务相关的vue框架





10. 前端工程化



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
