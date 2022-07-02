/* 
属于性能优化的部分
一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，重新计时
1: this绑定
2: 支持传参
3: 开始就执行
4: 取消防抖
5: 处理返回值

主要思路就是先清除定时器，在开启定时器
二者都有关于头尾是否执行的处理
*/

function debounce(func, time) {
  var timeout

  return function() {
    var context = this
    var args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(func.apply(context,[...args]), time)
  }
}

// v2 判断是否立即执行,添加返回值
function debounce2(func, time, immediate) {
  var timeout
  var result

  if (timeout) clearTimeout(timeout)
  return function() {
    var context = this
    var args = arguments || {}
    if (immediate) {
      // 需要判断是否执行过
      var callNow = !timeout
      // 不管是否立即执行，都要添加/取消定时器
      timeout = setTimeout(function() {
        timeout = null
      }, time)
      // 若不存在定时器，则立即执行
      // 同步操作才可以拿到返回值
      if (callNow) result = func.apply(context,args)
    } else {
      // 正常添加定时器
      timeout = setTimeout(function(){
          func.apply(context, args)
      }, wait)
    }

    return result
  }
}

// v3 支持取消


/* 
节流： 每隔一段时间，只执行一次事件
对于这一类函数返回函数的都需要关注 this 和 参数
这种时间间隔的实现可以用定时器 | 事件戳
*/
function throttle(func, time) {
  var context, args
  var start = 0 // 开始时间戳

  return function () {
    // 记录触发时的时间戳
    var now = +new Date()
    context = this
    args = arguments
    if (now - start > time) {
      func.apply(context, args)
      start = now
    }
  }
}

function throttle2(func, time) {
  var timeout

  return function() {
    var context = this
    var args = arguments

    // 不存在定时器才处理
    if (!timeout) {
      // 在定时器执行逻辑的那一次事件循环里清除定时器
      timeout = setTimeout(function() {
        timeout = null
        func.apply(context,args)
      }, time)
      // 之后清除定时器
    }
  }
}

/* 
  实现图片懒加载
  图片有一个默认显示
  1: 布局高度 < 卷去高度 + 窗口高度 开始显示
  2: 展示的高度 < 窗口高度
  3: 利用 IntersectionObserver 判断是否在视口中
  4: 获取dom元素的dataset 自定义属性   :data-id=123  dataset.id = 123
  一些高度值
  clientHeight: 窗口高度
  offsetTop: 相对于offsetParent的距离，这个距离需要累加才可以拿到绝对距离
  scrollHeight: 滚动卷曲的高度
  getBoundingClientRect： 可以获取4个方向的值

  由于涉及到频繁取高度值，所以需要限制执行频率
  这一类滚动，高度的api貌似都可以优化成 IntersectionObserver
  参考： https://juejin.im/post/6844903874302574599
*/
var imgs = document.querySelectorAll(imgs) || []
function lazyLoad1(imgs) {
  // s+h > offsetTop
  const H = document.documentElement.clientHeight
  const S = document.documentElement.scrollTop
  // 这种写法是考虑到存在父元素存在定位，一般直接取
  // 参考 https://www.cnblogs.com/xiaohuochai/p/5828369.html
  const getOffsetTop = (e) => {
    const T = e.offSetTop
    while(e = e.offsetParent) {
      T += e.offSetTop
    }
    return T
  }
  // someKey 中保留真实的图片地址
  for (let item of imgs) {
    if (H + S + 100 > item.offsetTop) {
      item.src = item.someKey
    }
  }
}

function lazyLoad2(imgs) {
  // 回调中是所有监听实例,是一个dom对象
  const io = new IntersectionObserver((instances) => {
    instances && instances.forEach(item => {
      const img = item.target
      // 获取展示的比率
      const showRatio = item.intersectionRatio
      if (showRatio > 0 && showRatio < 1) {
        if (!img.src) {
          img.src = img.dataset.src
        }
      }
      // 取消观测
      img.onload = img.onerror = () => {
        item.unobserve(item)
      }
    })
  })
  // 开始观测
  imgs.forEach((img) => {
    io.observe(img)
  })
}



/* 
  实现无缝轮播
  
*/
(function () {
  // 顺带考察类数组对象
  let prev = document.getElementsByClassName("carousel-prev")[0];
  let next = document.getElementsByClassName("carousel-next")[0];
  let board = document.getElementsByClassName("carousel-board")[0];
  let panels = Array.from(document.getElementsByClassName('carousel-board-item'));
  // 正负值代表移动的方向
  board.style.left = "-400px"; //设置初始的left值
  let index = 1; //设置初始的index值
  prev.addEventListener("click", function () {
      index++
      console.log(index);
      animate(-400);
      //关键点 如果当前在 1fake 的位置
      if (index === panels.length - 1) {
          setTimeout(() => {
              //去掉动画
              board.style.transition = "0s";
              let distance = 4 * 400
              //默默的左移board至 1
              board.style.left = parseInt(board.style.left) + distance + "px"
          }, 600)
          index = 1;
      }

  })
  next.addEventListener("click", () => {
      index--
      console.log(index);
      animate(400);
      //关键点 如果当前在 4fake 的位置
      if (index === 0) {
          setTimeout(() => {
              // 去掉动画
              board.style.transition = "0s";
              let distance = -4 * 400
              //默默的右移board 至 4
              board.style.left = parseInt(board.style.left) + distance + "px"
          }, 600)
          index = 4;
      }
  })

  function animate(width = 400) {
      board.style.transition = "0.5s";
      board.style.left || (board.style.left = 0)
      board.style.left = parseInt(board.style.left) + width + "px";
  }
})()

