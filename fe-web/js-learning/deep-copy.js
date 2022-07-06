
/*
涉及的知识点：
原始/引用类型，堆栈保存
https://github.com/yygmind/blog/issues/25
*/


/*
实现浅拷贝
Object.assign()
数组slice,concat等非变异方法
*/


/*
JSON.parse(JSON.stringify(obj))
无法处理Date,function,undefined等
*/


// eg1:浅复制
function shallowClone(source) {
  if (typeof source === 'object' || source !== null) {
    var target = Array.isArray(source) ? [] : {}
    // 原型上的属性需要排除
    for (var key in source) {
      // 对象自身的可枚举属性
      // 引用类型不一定是obj
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key]
      }
    }
    return target
    }
}

/*
考虑： 1实现基本的深拷贝
      2参数边界类型，入参类型
      3循环引用 设置weakMap: 强弱引用关系，优化内存GC
      4递归优化（BFS）
*/
// 严格判断数据类型
function typeCheck(item) {
  return Object.prototype.toString.call(item)[1]
}
// 判定引用类型即可
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

// dfs实现深拷贝
function deepClone(source, resMap = new WeakMap()) {
  if (!isObject(source)) return source
  if (resMap.has(source)) return resMap.get(source)

  // 根据传入参数类型确定返回值类型
  var target = Array.isArray(source) ? [] : {}
  // weakMap 存值
  resMap.set(source,target)
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source,key)) {
      if (isObject(source[key])) {
        // 这里是dfs处理
        deepClone(source[key], resMap)
      } else {
        // 直接赋值
        target[key] = source[key]
      }
    }
  }
  return target
}

// bfs 实现
// 按层搜索
function bfsCopy(source) {
  if (!isObject(source)) return source
  var target = Array.isArray(source) ? [] : {}

  // 借助队列，这里可以丰富队列的结构
  var quene = [source]

  while(quene.length) {
    // var tmp = quene.shift()
    // if (isObject(tmp)) {
    //   // 同一层子节点全部入队列
    //   for(var key in tmp) {
    //     quene.push(tmp[key])
    //   }
    // } else {
    //   target.push(tmp)
    // }

    var tmp = quene.shift()
    if (isObject(tmp)) {

    } else {

    }

  }
}
