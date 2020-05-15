// 引入模块
const path = require('path')

// path.basename() 返回文件路径名的最后一部分
// console.log(path.basename(__filename));

// path.dirname() 返回文件路径名的目录名
// console.log(path.dirname(__filename))

// path.extname() 返回文件路径名的扩展名
// console.log(path.extname(__filename))

// path.parse() 把文件路径名转成一个对象返回
// console.log(path.parse(__filename))

// path.join() 串联路径
console.log(path.join(__dirname, 'test', 'hello.html'))