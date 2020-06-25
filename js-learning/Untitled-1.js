// 尾部添加操作
let arr = ['apple', 'banana'];
arr.push('orange');
console.log(arr, '----添加元素到数组末尾'); // ['apple', 'banana', 'orange' ]

// 尾部删除操作
let arr = ['apple', 'banana','orange'];
arr.pop();
console.log(arr, '----删除数组末尾元素'); //['apple', 'banana']

// 头部增加
let arr = ['banana'];
arr.unshift('eggs');
console.log(arr, '----添加元素到数组的头部')  //[ 'eggs', 'banana' ]

// 头部删除
let arr = ['apple', 'banana'];
arr.shift();
console.log(arr, '----删除数组最前面的元素') //[ 'banana' ]

function Stack() {
  // 数组模拟
  var item = []
  /* 
  push: 
  pop:
  */
}


// bfs
function BFS(list) {
  var queue = [list]

  var tmp = queue.shift()
  if(tmp) {
    for (var i = 0; i < tmp.length; i++) {
      if (tmp.children) {
        queue.push(tmp.children)
        console.log(tmp.id)
      }
    }
  }
}

// promsie
const promiseInstance = new Promise(function(resolve, reject){
    const timeout = setTimeout(() =>{
      console.log('test')
    },1000)
    resolve(timeout)
  }
)
promiseInstance.then()



