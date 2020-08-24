const fs = require('fs')
// 创建读取流读取文件
const readStream = fs.createReadStream('../leetcode/预备基础.js')
var count = 0
var str = ''
readStream.on('data', (data) => {
  str+=data
  count++
})

readStream.on('end', () => {
  console.log(str)
  console.log(count)
})

readStream.on('error', (err) => {
  console.log(err)
})



// 创建写入流，写入文件
var str = ''
for(const i = 0; i < 1000; i++) {
  str+='asdasdas79d7as89d789as\n'
}
// 指定写入目录
var writeStream = fs.createWriteStream('./txt')
writeStream.write(str)
// 标记文件末尾，必须
writeStream.end()
// 结束
writeStream.on('finish', () => {
  console.log('写入成功')
})

// 实现读取再写入
readStream.pipe(writeStream)