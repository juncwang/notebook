### event

* 本插件无需安装, 在安装 `nodejs` 时会一并安装

* 使用方法
```js
// 引入事件模块
const events = require('events')

// 创建 EventEmitter 对象
const myEmitter = new events.EventEmitter()

// 注册事件
myEmitter.on('someEvent', (msg) => {
    // 实现异步的方法, 改方法不会阻塞线程
    setImmediate(() => {
        console.log(msg)
    })
})

// 触发事件
myEmitter.emit('someEvent', '实现事件并传递参数到注册的函数中回调函数的 msg 参数中')
```