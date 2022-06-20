/*
https://juejin.cn/post/6844903895467032589
js对象生成实际的Dom结构
或者描述为实现render函数
*/
// 描述node的构造函数
function Element (tagName, props, children) {
  this.tagName = tagName
  this.props = props
  this.children = children
}

function generateNode (tagName, props, children) {
  return new Element (tagName, props, children)
}
// ul可以描述ul-li*3的dom结构
var ul = generateNode('ul', {id: 'list'}, [
  generateNode('li', {class: 'item'}, ['I am Item']),
  generateNode('li', {class: 'item'}, ['I am Item']),
  generateNode('li', {class: 'item'}, ['I am Item'])
])

// 添加render方法
/*
处理三个api
createElement  tagName
setAttribute  props
appendChild  children
*/
Element.prototype.render = function () {
  var el = document.createElement(this.tagName)
  var props = this.props
  var children = this.children || []

  for (var propKey in props) {
    var tmpValue = props[propKey]
    el.setAttribute(propKey, tmpValue)
  }

  children.forEach(child => {
    var childEl = (child instanceof Element)
      ? child.render()
      : document.createTextNode(child)
      el.appendChild(childEl)
  })

  return el
}
var realUl = ul.render()
document.body.appendChild(realUl)

/**
 * 描述 diff 算法
 * 1. 什么是virtual-dom
 *    使用js对象描述dom结构，一般来说DFS/BFS去遍历树结构，vdom 的class设计内容丰富很多
 * 2. 在修改数据时候，触发dep.notify,然后patch(新旧树)，最后createElm 生成并插入dom节点，下面介绍patch细节
 *    2.1 两颗树的比较是o(n^3),所以为了简化是基于同层对比
 *    2.2 判断是否为同一类型节点，不是：则创建新的&删除旧的（参考sameVnode的处理逻辑）
 *        是相同节点：执行patchVnode逻辑，简单说就是当前元素对比，子元素对比（一共有5种情况），最大的流程在于新旧子树的对比
 *        新旧子树的对比主要目的是找可以复用的节点，以newNode为标准，移动oldNode,期间尽量复用旧节点，如果多了删除，少了则插入节点
 *          具体执行过程中是首尾双指针，一共有5种，第5种会引入key的对比（key属性在sameNode 判定种使用到），若使用index作为key,会导致key相同判定为sameNode而内容不同，从而还是触发dom更新无法复用
 * 3. virtual-dom在更新dom 上优势是什么
 *    3.1 通过diff流程可以发现，新旧vNode可以复用而且增量修改，每一次对比的结果最后可以理解是基于 dom api来修改旧的dom结构
 *    3.2 页面的渲染更新在事件循环后执行，期间会有多个任务队列，即js的执行机制
 */


