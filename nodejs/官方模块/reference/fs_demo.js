// 引入模块
const fs = require('fs')
const path = require('path')

// fs.mkdir() 异步创建目录
// fs.mkdir(path.join(__dirname, 'test'), {}, err => {
//     if(err) throw err
//     console.log('目录已创建...')
// })

// fs.writeFile() 异步创建并写入文件
// fs.writeFile(path.join(__dirname, 'test', 'hello.txt'), 'hello world', err => {
//     if(err) throw err
//     console.log('文件已被写入...')
// })

// fs.appendFile() 异步在文件中添加内容
// fs.appendFile(path.join(__dirname, 'test', 'hello.txt'), 'I love Node.js', err => {
//     if(err) throw err
//     console.log('文件已经追加内容...')
// })

// fs.readFile() 异步读取文件内容
// fs.readFile(path.join(__dirname, 'test', 'hello.txt'), 'utf8', (err, data) => {
//     if (err) throw err
//     console.log(data)
// })

// fs.rename() 文件重命名
fs.rename(path.join(__dirname, 'test', 'hello.txt'), path.join(__dirname, 'test', 'helloworld.txt'), err => {
    if(err) throw err
    console.log('文件已被重新命名...')
})