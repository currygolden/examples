/* 
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

/* 
Dom结构如何用js对象描述
*/