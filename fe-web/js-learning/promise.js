
/*
参考文章
https://segmentfault.com/a/1190000018428848 promiseA+规范
https://github.com/Sunny-117/js-challenges 一些promise训练
1. 实现Promise
2. async 函数特点
3. 常见异步函数结果判断
4. 常见异步方案实现总结
*/

import { watch } from "fs"

/**
 * @description 拆解promise主要流程
 * feature分析
 * 1. Promise构造函数接受executor，形参包含resolve，reject
 * 2. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 3. 实现构造函数，实现resolve, reject逻辑
 * 4. 实现then方法（核心）
 * 5. 实现原型函数 then
 * 6. 实现类函数
 * 7. 完善单元测试
 */
const PENDING = "pending"
const FULFILLED = "fullfilled"
const REJECTED = "rejected"
function Promise(executor) {
  // 缓存this,避免后续被修改指向
  let that = this
  // 定义私有属性
  that.status = PENDING
  that.value = undefined //fulfilled参数
  that.reason = undefined //rejected参数
  that.successCallbacks = [] // success回调,对一个相同的promise then多次可以注册多个成功回调，fail类似
  that.failCallbacks = [] // fail回调

  /*
    1. 修改状态，处理返回值，处理回调
    2. 这里对处理回调不够理解，通过then方法注册的回调，会在执行resolve时顺序执行一遍
  */
  function resolve (value) {
    if (that.status === PENDING) {
      that.status = FULFILLED
      // 获取resolve传入的参数
      that.value = value
      // 执行回调，参数都是resolve的值
      that.successCallbacks.forEach(cb => cb(that.value))
    }
  }

  function reject(reason) {
    if (that.status = 'pending'){
      that.status = REJECTED
      that.reason = reason
      that.failCallbacks.forEach(fn => fn(reason))
    }
  }

  // 处理resolve，reject或者直接throw的场景
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }

}

/**
 * 1. then方法的入参判断，包装
 * 2. promise对象具有then方法，需要判断当前对象的状态
 *    2.1 等待：收集相应的回调函数（push 队列），then的回调执行需要是微任务，所以用setTimeout包装
 *    2.2 成功/失败：都是异步执行，都需要判断then返回的promise与回调的返回值
 * 3. then方法返回的promise应该是什么状态，取决于回调函数自身（主动reject,抛错，其它大多都是resolve状态）
 *    3.1 核心是处理then回调返回值的判断，一共三种情况
 *
 */
Promise.prototype.then = (onFulfilled, onRejected) => {
  // 判断回调是否为函数，处理值穿透,不是函数包装成函数
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

  let self = this
  // then 需要返回一个新的promise
  let promise2 = new Promise((resolve, reject) => {
    // 判断之前promise的状态
    if (self.status === 'FULFILLED') {
      // 成功的回调
      setTimeout(() => {
        try {
          let res = onFulfilled(self.value)
          // 处理返回值
          resolvePromise(promise2, res, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
    } else if (self.status === 'REJECTED'){
      // 失败回调
      setTimeout(() => {
        let res = onRejected(self.value)
        resolvePromise(promise2, res, resolve, reject)
      })
    } else {
      // 收集回调函数
      self.successCallbacks.push(() => {
        setTimeout(() => {
          try {
            let res = onFulfilled(self.value)
            // 处理返回值
            resolvePromise(promise2, res, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      })

      self.failCallbacks.push(() => {
        setTimeout(() => {
            try {
                let x = onRejected(self.reason);
                resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
                reject(e);
            }
        });
    });
    }
  })
  return promise2
}
// 判断then返回的promsie与回调函数返回值，处理新的promise 的状态
function resolvePromise(promise2, res, resolve, reject) {
  let that = this
  // 区别then的返回值与回调的返回值
  if (promise2 === res) {
    reject(new TypeError('Chaining cycle'))
  }
  // 如果返回promise或者有then方法会递归解析
  if (x instanceof Promise) {
    x.then(resolve, reject)
  } else {
    // 原始类型
    resolve(res)
  }
}

/**
 * @description 实现Promise.resolve
 * 1. promise直接返回
 * 2. 原始值包裹
 * 3. 包含then方法：最后状态取决于then结果
 */
Promise.resolve = function(val) {
  if (val instanceof Promise) {
    return val
  }
  return new Promise((resolve, reject) => {
    // thenable
    if (val && val.then && typeof val.then === 'function') {
      // 自行模拟的then都是异步
      val.then(resolve, reject)
    } else {
      resolve(val)
    }
  })
}

/*
  实现promise-all
  当所有实例均为fulfilled,reslove全部实例的参数
  返回一个promise 对象
  回调参数对应
*/
Promise.all = function(promiseArr) {
  return new Promise((resolve, reject) => {
    let resArr = []
    // 需要借助闭包变量，确定then了5次
    let i = 0
    // 参数及顺序处理
    function handleData(obj, idx) {
      resArr[i] = obj
      i++
      if (i === promiseArr.length) {
        // 这一步带上结果
        resolve(resArr)
      }
    }
    promiseArr.forEach((promiseObj, index) => {
      promiseObj.then(res => {
        handleData(res, index)
      }, fail).catch(res => {
        // 也可以把reject作为失败的回调
        reject()
      })
    })
  })
}

/*
  race方法实现
*/
Promise.race = function(promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item, index) => {
      // 任何一个实例由pending切换状态，对应执行
      item.then(value => {
        // resolve只会调用一次，这里用forEach也行
        resolve(value)
      }, reason=> {
        reject(reason)
      })
    })
  })
}

// 模拟轮询
Promise.retry = (fn, times = 5, tryTimes = 0) => {
  fn().then(() => {
    resolve()
  }).catch((e) => {
    if (tryTimes < times) {
      tryTimes ++
      Promise.retry(fn, times = 5, tryTimes)
    } else {
      reject(e)
    }
  })
}

/*
批量请求函数 multiRequest(urls, maxNum)
urls: 所有的待访问url
要求最大并发数 maxNum
每当有一个请求返回，就留下一个空位，可以增加新的请求
所有请求完成后，结果按照 urls 里面的顺序依次打出
思路： 并发请求跟promise.all无关  普通的循环都可以做到
*/
async function multiRequest(urls, maxNum) {
  let result = new Array(urls.length).fill(false)
  let sum = urls.length
  let count = 0
  return new Promise((resolve, reject) => {
    // 请求最大数,这里是实现并发
    while(count < maxNum) {
      next()
    }
    // 定义请求函数
    function next() {
      // 这种赋值语句有坑
      let current = count++
      // 判断是否全部结束
      if (current >= sum) {
        // 结果的修改是在回调里进行的
        !result.includes(false) && resolve(result)
      }
      let url = urls[current]
      console.log('start' + current, new Date().toLocaleDateString())
      fetch(url).then((res) => {
        console.log('end' + current, new Date().toLocaleDateString())
        result[current] = res
        if (current < sum) {
          next()
        }
      })
      .catch((err) => {
        console.log('end' + current, new Date().toLocaleDateString())
        result[current] = err
        if (current < sum) {
          next()
        }
      })
    }
  })
}

/*
实现 a, a+b , a+2b的间隔执行
停止以上间隔
*/
function myInterval(fn, a, b) {
  this.a = a
  this.b = b
  this.time = 0
  this.handle = -1
  // 开始
  this.start = () => {
    this.handle = setTimeout(() => {
      fn()
      this.time++
    }, this.a + this.time * this.b)
  }
  this.cancel = () => {
    clearTimeout(this.handle)
  }
}


/**
 * async 函数注意点
 * 1. async 返回promise,值为函数的返回值
 * 2. 可以用来创建 promise 链，之后接catch/then
 * 3. await 后面接promise对象或者任意值均可，非promise存在无法排队
 * 4. async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。
 * 5. 一个await 抛出错误则整个async的状态为reject
 * 6. 处理多个串行await不阻塞，可以提前try catch 或者.catch,但是一般异步有依赖所以会提前中断，多个await可以try catch 捕获
 * 7. 本身 async 的异常可以一次捕获，单个/多个await异常捕获,或者说catch本身业务不应该关注，但是err是需要暴露的
 * 8. await的同步异步触发
 */

//  轮询的思路
async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}

/**
 * @description 异步并行调度管理
 * 1. 同时最多K个任务运行
 *
 */
