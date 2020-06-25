let appcallBacks = null

function isFn() {
  return Object.prototype.toString.call(obj) === "[object Function]"
}

function isStr() {
  return Object.prototype.toString.call(obj) === "[object String]"
}

// 全局挂载
function initGlobal(app) {
  app.invoke = invokeNative()
}

// 定义app对象
window.app = {
  appcallBacks
}

function invokeNative(name) {
  // 接受其它的参数
  return function(...params) {
    let callback = noop

    if (paramLength >= 1 && isFn(param[paramLength - 1])) {
      callback = param.pop()
    }

    // 处理回调
    if (!mobikeCallbacks[callback]) {
      callback = mobikeCallbacks.push(callback) - 1 + ''
    } else {
      callback = mobikeCallbacks.indexOf(callback) + ''
    }
    // 处理函数名
    let fn = name || (isStr(param[0]) ? param[0] : '')

    // 处理参数
    let data = param[param.length - 1] === fn ? '' : param[param.length - 1]
    param = encodeURIComponent(JSON.stringify(data))
    let url = `app://bridge?name=${fn}&data=${param}&callback=${callback}`
    schemeJump(url)
  }
}

