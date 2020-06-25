/* 
参考文章 https://juejin.im/post/5afd2ff26fb9a07aaa11786c
https://segmentfault.com/a/1190000018428848
*/

const promiseIns = new Promise ((resolve, reject) => {
  // 分别用来转换状态
  // 实际的结果或者错误一般交给then对应的回调
  resolve(data)
  reject(err)
})

// api
/* 
  确定promise方法的回调，取决于状态
  fail一般不写，在catch中获取
*/
promiseIns.then(success,fail).catch()



// 如何设计一个promise
/* 
  excutor是V8实现的，形参包括resolve,reject | function
  promise的状态在哪改动的
*/
const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

function Promise(excutor) {
  let that = this
  // 定义私有属性
  that.status = PENDING
  that.value = undefined //fulfilled参数
  that.reason = undefined //rejected参数
  that.successCallbacks = [] // success回调
  that.failCallbacks = [] // fail回调

  /* 
    实现简易版resolve
    修改状态，传递参数给then
    表明resolve处理和执行回调的先后顺序
  */
  function resolve (value) {
    // 传入promise对象
    if (typeof value === Promise) {
      // 
      value.then()
    }
    // 没有then的时候successCallbacks从哪来的
    // then方法执行需要设计成异步
    setTimeout(() => {
      if (that.status === PENDING) {
        that.status = FULFILLED
        // 获取resolve传入的参数
        that.value = value
        // 执行回调
        that.successCallbacks.forEach(cb => cb(that.value))
      }
    })
  }

  /* 
    实现reject，没什么可写的
  */
  function reject(reason) {
    if (this.status = 'pending'){
      this.reason = reason
      this.status = 'resolved'
    }
  }
  /* 
    全局错误接受
  */
  try {
    // resolve, reject是excutor的形参
    excutor(resolve, reject)
  } catch (e) {
    reject(e)
  }

}

/* 
  promise的状态随意，但是回调的执行需要异步
  1: then的回调在下一轮时间循环执行
  2: then方法返回promise对象，支持链式调用
    这里then方法的返回值有两种
*/
Promise.prototype.then = (onFulfilled, onRejected) => {
  // 判断回调是否为函数
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

  let self = this
  // then 需要返回一个新的promise
  let promise2 = new Promise((resolve, reject) => {
    // 判断之前promise的状态
    if (self.status = 'FULFILLED') {
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
    } else if (self.status = 'REJECTED'){
      // 失败回调
      setTimeout(() => {
        let res = onRejected(self.value)
        resolvePromise(promise2, res, resolve, reject)
      })
    } else {
      // 收集回调函数
      self.onFulfilled.push(() => {
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
    }
  })
  return promise2
}
// 处理then返回的promsie与回调函数返回值
function resolvePromise(promise2, res, resolve, reject) {
  if (res !== null && (typeof res === 'object' || typeof res === 'function')) {

  } else {
    // 原始类型
    resolve(res)
  }
}

/* 
  实现promise-all
  当所有实例均为fulfilled,reslove全部实例的参数
*/
Promise.all = function(promiseArr) {
  
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
*/
async function multiRequest(urls, maxNum) {
  
}