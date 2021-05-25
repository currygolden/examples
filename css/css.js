/* 
参考文章https://juejin.im/post/5aa252ac518825558001d5de#1 常见布局方案
      bfc https://segmentfault.com/a/1190000013023485#item-1
      margin折叠
*/
// 项目的响应式如何实现的
/* 
1: 根据rem
2: 脚本计算不同设备的rem
3: 引入px-remloader，在业务中写px
*/ 

// 项目的样式方案做了哪些设计
/* 
  1: 父子组件样式覆盖
  2: 全局样式变量，常用类， mixin
*/





// 水平居中
/* 
行内元素
.parent {
  text-align: center 行内内容(文字、行内元素、行内块级元素)如何相对他的块父元素对齐
}

定宽块级
.son {
  width: 100px;
  margin: 0 auto;
}
定位属性，要求父子元素的宽高已知
.parent {
  position: relative;
  width: 200px;
}
.son {
  position: absolute;
  left: 50%;  父元素
  width: 20px;
  transform: translateX(-50%); 本身
}
*/

/* 
垂直居中
行内元素
.parent {
  height: 100px;
  line-height: 100px;
}



*/


/* 
 这里汇集所有遇到的css类问题
 1. 描述所有的水平居中的办法
 2. 描述所有的垂直居中的办法
  https://juejin.cn/post/6844903550909153287
 3. 浮动的特点，如何清除浮动
 4. 伪类和伪元素的区别
  a 是否需要描述一个新的元素
  b 都是用：来表示，元素后来是：：
 5.多个 display:inline-block 的属性会导致空白
  a 处理html的换行导致的
  b 都设置float left
 6 flex的属性用过哪些
  http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
 7 css中常见的一些百分比值
  https://segmentfault.com/a/1190000000590998
 8 描述一些常见布局方案的实现
   两列 定宽 + 自适应
   三列 定宽 + 自适应
 9 响应式布局怎么实现的，postcss，和预处理器的区别是
  https://segmentfault.com/a/1190000003909268
 10 如何理解 bfc，dpr
 11 css 动画描述下
 11 项目中样式组织有什么经验
*/
