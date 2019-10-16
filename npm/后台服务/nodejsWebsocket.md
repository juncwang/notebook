### 后端代码实例

```js
const ws = require('nodejs-websocket')
const port = 5000
var user = 0;

// 创建一个连接
const server = ws.createServer((conn) => {
    console.log('create websocket')
    user++;
    conn.nickname = 'user' + user
    conn.fd = 'user' + user
    let mes = {}
    mes.type = 'enter'
    mes.data = conn.nickname + '进来了'
    broadcast(JSON.stringify(mes))

    // 向客户端推送消息
    conn.on('text', (str) => {
        console.log('回复' + str)
        mes.type = 'message'
        mes.data = conn.nickname + '说:\t' + str
        broadcast(JSON.stringify(mes))
    })

    // 客户端关闭
    conn.on('close', (code, reason) => {
        console.log('关闭连接')
        mes.type = 'leave'
        mes.data = conn.nickname + ' 离开了'
        broadcast(JSON.stringify(mes))
    })

    // 连接出错
    conn.on('error', (err) => {
        console.log(err)
    })
}).listen(5000, () => {
    console.log('websocket running ... ...')
})



function broadcast(str) {
    // 向所有连接发送消息
    server.connections.forEach((connection) => {
        connection.sendText(str)
    })
}
```

### 前端代码实例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <h1>Websocket 简易聊天</h1>
    <div id="app">
        <input type="text" id="sendMsg" />
        <button id="submitBtn">发生</button>
    </div>
</body>

<script>
    function showMessage(str, type) {
        var div = document.createElement('div')
        div.innerHTML = str
        if (type == 'enter') {
            div.style.color = 'blue'
        } else if (type == 'leave') {
            div.style.color = 'red'
        }
        document.body.appendChild(div)
    }
    // 创建一个 WebSocket
    var websocket = new WebSocket("ws://127.0.0.1:5000")
    // 打开 WebSocket 链接
    websocket.onopen = () => {
        console.log('websocket open')
        document.getElementById('submitBtn').onclick = () => {
            var txt = document.getElementById('sendMsg').value
            if (txt) {
                // 向服务器发送数据
                websocket.send(txt);
            }
        }
    }
    // 关闭 WebSocket 连接
    websocket.onclose = () => {
        console.log('websocket close')
    }
    // 接收 WebSocket 服务器返回的数据
    websocket.onmessage = (e) => {
        console.log('websocket message')
        var mes = JSON.parse(e.data)
        showMessage(mes.data, mes.type)
    }
</script>

</html>
```