##### socket.io 
`npm install socket.io`

##### express 使用
```js
const express = require('express')
const socket = require('socket.io')

const app = express()
const server = app.listen(5000, () => {})

const io = socket(server)

io.on('connection', (socket) => {
    console.log('实现 socket 链接', socket.id)
})
socket.on('disconnect', function () {
    console.log('断开一个连接。');
});

// 向指定用户发送消息
io.sockets.connected[socket.id].emit('message','surprise');
// 发送信息给所有链接的客户
io.sockets.emit('eventName', data)
// 广播 - 发送给除了发入人的其他人
scoket.broadcast.emit('typing', data)

// 关闭链接
socket.disconnect();
```

##### 客户端
`npm install socket.io-client`

```js
import io from 'socket.io-client';

// 链接服务器
const socket = io('http://localhost:3000');

console.log('init');

// 监听服务器 connect 事件
socket.on('connect', (data) => {

});

// 客户端向服务器发生数据
socket.emit('chat', data)

// 关闭链接
socket.disconnect();
```