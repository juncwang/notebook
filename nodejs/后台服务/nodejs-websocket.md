* 安装 nodejs-websocket 包
    * `npm install nodejs-websocket`
* 引入包 `const ws = require('nodejs-websocket')`
* 创建连接
```js
    var server = ws.createServer((conn) => {
        // 给连接到服务器的客户端发送消息
        conn.sendTest(str)

        // 接收客户端的消息事件
        conn.on('text', (str) => {
            // str 为客户端传回的消息
        })

        // 客户端关闭事件
        conn.on('close', (code, reason) => {
            // ... ...
        }

        // 连接出错事件
        conn.on('error', (err) => {
            // ... ...
        })
    }).listen(port, () => { 
        // 监听端口回调函数
    })

    // 服务器的所有客户端连接
    server.connections
```