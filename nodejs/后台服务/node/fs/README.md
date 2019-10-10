### fs

* 本插件无需安装, 在安装 `nodejs` 时会一并安装

* 注意 使用方法时 方法名后 加 Sync 问同步阻塞式, 没有的为 异步非阻塞式, 需要在后面加入回调函数 function(err, ...)

* 读取 写入 文件的使用方法
```js
// 引入文件系统模块
const fs = require('fs')

// 定义一个接收文件的变量
var file

// 同步读取文件 阻塞式
file = fs.readFileSync('package.json','utf-8')
// 异步读取文件 非阻塞式
fs.readFile('package.json','utf-8', (err, data) => {
    if(err) throw err
    console.log(data + 'readFile')
})
console.log(file + 'readFileSync')

// 同步写入文件 阻塞式
fs.writeFileSync('writeTest.json', file)
// 异步写入文件 非阻塞式
fs.writeFile('writeTest2.json', aa, () => {
    console.log( 'writeFile success')
})
```

* 创建 删除 文件夹及删除文件的使用方法
```js
// 引入文件系统模块
const fs = require('fs')

// 异步删除文件 非阻塞式
fs.unlink('writeTest.json',(err) => {
    if(err) throw err
    console.log('delete success')
})

// 同步创建文件夹 阻塞式
fs.mkdirSync('stuff')

// 同步删除文件夹 阻塞式
fs.rmdirSync('stuff')

// 异步创建和删除文件夹 非阻塞式
fs.mkdir('stuff', (err)=> {
    if(err) throw err
    console.log('mkdir success')
    fs.rmdir('stuff', (err) => {
        if(err) throw err
        console.log('rmdir success')
    })
})
```

* 检测文件, 文件夹是否存在的使用方法
```js
// 引入文件系统模块
const fs = require('fs')

// 判断文件或文件夹是否存在
fs.exists('stuff', (exists) => {
    if(exists){
        console.log('file is exists')
    }else{
        console.log('file not is exists')
    }
})

```

* 输入输出流
```js
const fs = require('fs')

const fsReadStream = fs.createReadStream(__dirname + '/xxx.tex', 'utf8')
const fsWriteStream = fs.createWriteStream(__dirname + '/xxx2.txt', 'utf8')

// 使用管道触发输入
fsReadStream.pipe(fsWriteStream)

// 使用事件触发输入
// let num = 0
// fsReadStream.on('data', (data) => {
//     num++;
//     console.log(`==============读取第 ${num} 次=================`)
//     fsWriteStream.write(data)
// })
```