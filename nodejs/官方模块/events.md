### events

* 引入 `const events = require('events')`
    * 创建 `class MyEmitter extends events{}`
        * 实例 `const myEmitter = new MyEmitter()`

* 参数
    * `eventName <string> | <symbol>` 事件名称。
    * `listener <Function>` 回调函数
        * `...args <any>` 回调函数接收的参数
    * `...args` 传递的参数

* 方法
    * myEmitter.on(eventName, listener) 监听事件同步
        * `setImmediate(()=>{})` 如需使用异步需在监听方法内使用该方法
    * myEmitter.emit(eventName[, ...args]) 触发事件