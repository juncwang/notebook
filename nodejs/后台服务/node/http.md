### http

* 本插件无需安装, 在安装 `nodejs` 时会一并安装

* 使用方法
```js
// 引入 http 系统模块
const http = require('http')

// 创建服务器方法
const server = http.createServer((req,res) => {
    console.log('客户端向服务器发送了请求: ' + req.url)
    res.writeHead(200, {"Content-type":"text/plain"})
    res.end('Server is working!!!')
})

// 服务对象监听服务以及端口号
server.listen(8888, '127.0.0.1', () => {
    console.log('Server On Running Is Port : 8888')
})
```

* 使用文件流写入http接口
```js
const fs = require('fs')
const http = require('http')

const fsReadStream = fs.createReadStream(__dirname + '/xxx.tex', 'utf8')

const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-type':"text/plain"})
    // 展示 html 页码
    // res.writeHead(200, {'Content-type':"text/html"})
    // 展示 json 数据
    // res.writeHead(200, {'Content-type':"application/json"})
    fsReadStream.pipe(res)
})

server.listen(5000, ()=>{})
```