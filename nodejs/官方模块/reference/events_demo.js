// 引入模块
const EventEmitter = require('events')

// 创建 MyEmitter 类
class MyEmitter extends EventEmitter{}

// 实例化对象
const myEmitter = new MyEmitter()

// 注册事件
myEmitter.on('event', (msg) => {
    // 同步执行事件
    // console.log(msg)
    // 异步执行事件
    setImmediate(() => {
        console.log(msg)
    })
})

// 触发事件
myEmitter.emit('event', '实现事件并传递参数到注册事件回调函数中')

console.log(1)