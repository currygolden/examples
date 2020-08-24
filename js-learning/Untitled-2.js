function DfsDocument(node, level = 1) {
  let root = document.getElementById('#root')
  if (root.children) {
    DfsDocument(root.children, level+1)
  } else {
    console.log(`level${level}:`, root.innerHTML)
  }
} 

function BfsDocument(node, level = 1) {
  let quene = []
  // 准备数组元素
  quene.push(node)
  while (quene.length){
    // 获取第一个
    let first = quene.shift()
    console.log('mes:', first.innerHTML)
    // 再次入队列
    if (first.children) {
      quene.push(first.children)
    }
  }
}


// 操作dom的优化场景 https://juejin.im/entry/58993a1e8d6d8100584ed054