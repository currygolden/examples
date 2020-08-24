/* 
属于性能优化的部分
一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，重新计时
1: this绑定
2: 支持传参
3: 开始就执行
4: 取消防抖

主要思路就是先清除定时器，在开启定时器
*/

function debounce(func, time) {
  var timeout

  return function() {
    var context = this
    var args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(func.apply(context,args), time)
  }
}


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
  一些高度值
  clientHeight: 窗口高度
  offsetTop: 默认布局时距离顶部高度
  scrollHeight: 滚动卷曲的高度
  getBoundingClientRect： 可以获取4个方向的值
*/



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