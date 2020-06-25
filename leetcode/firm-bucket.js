// '(', ')', '{', '}', '[' and ']'一类标签是否输入合理

/* 
  @param {string} s
  @return {boolean}
  和html的标签闭合规则比较类似
*/
var isValid = function(str) {
  const stack = []
  // 一般for in需要hasownproperty来排除原型属性
  for (let i in str) {
    const p = str[i]

    // 左标记入栈
    if (['(', '[', '{'].indexOf(p) > -1){
      stack.push(p)
    } else {
      // 取栈顶元素,需要等于栈顶对应map的值
      const peak = stack.pop()
      if (p !== mapper[peak])
      return false
    }
  }
  // 如果栈数据没有出完，false
  if (stack.length > 0) return false
  return valid
}