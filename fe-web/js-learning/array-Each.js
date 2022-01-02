/* 
数组扁平化
树形与扁平化转换 https://segmentfault.com/a/1190000017214328
扁平化可以优化的使用BFS处理，递归考虑到爆栈的存在
二叉树遍历解读 https://segmentfault.com/a/1190000016226334

知识体系： https://juejin.im/post/5df5bcea6fb9a016091def69
js 体系： https://github.com/mqyqingfeng/Blog
*/

function DFSFlat(list) {
  if(list.length === 0) {
    return false
  }
  var ret = []
  for (var i = 0; i < list.length; i++) {
    if(list[i].children) {
      DFSFlat(list[i].children)
    } else {
      ret.push(list[i].id)
    }
  }
}
