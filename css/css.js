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
