// 引入模块
const http = require('http')
const path = require('path')
const fs = require('fs')

// 创建变量, 创建服务器对象
const server = http.createServer((req, res) => {
    // 返回页面或json数据
    // if (req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
    //         if(err) throw err
    //         res.writeHead(200, {'Content-Type' : 'text/html'})
    //         res.end(data)
    //     })
    // }
    // if (req.url === '/about') {
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, data) => {
    //         if(err) throw err
    //         res.writeHead(200, {'Content-Type' : 'text/html'})
    //         res.end(data)
    //     })
    // }

    // if (req.url === '/api/users') {
    //     const users = [
    //         {name: 'Summber', age: 25},
    //         {name: 'Wang', age: 36}
    //     ]
    //     res.writeHead(200, {'Content-Type': 'application/json'})
    //     res.end(JSON.stringify(users))
    // }
    
    let filePath = path.join(__dirname, 'public', req.url === '/'?'index.html':req.url)
    
    // 初始化 content type
    let contentType = 'text/html'

    // 文件扩展名
    let extname = path.extname(filePath)

    switch(extname) {
        case '.js':
            contentType = 'text/javascript'
            break
        case '.css':
            contentType = 'text/css'
            break
        case '.json':
            contentType = 'application/json'
            break
        case '.png':
            contentType = 'image/png'
            break
        case '.jpg':
            contentType = 'image/jpg'
            break
    }

    // 读取文件
    fs.readFile(filePath, (err, data) => {
        if(err) {
            if(err.code === 'ENOENT') {
                // 没有找到页面
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data => {
                    if (err) throw err
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(data, 'utf8')
                }))
            }else {
                // 其他服务器错误
                res.writeHead(500)
                res.end(`服务器错误 : ${err.code}`)
            }
        }else {
            // 成功
            res.writeHead(200, {'Content-Type' : contentType})
            res.end(data, 'utf8')
        }
    })
})

// 端口号
const Port = process.env.PORT || 5000

// 监听端口号
server.listen(Port, () => {
    console.log(`服务器已经在 ${Port} 端口号下运行...`)
})