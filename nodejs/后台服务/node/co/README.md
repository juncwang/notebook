### co

* 安装方式
    * `npm install co --save-dev`

* 使用方法
```js
const co = require('co')
const fetch = require('node-fetch')

// 传递一个生成器 使用 yield 实现异步执行
co(function *() {
    const res = yield fetch('https://api.douban.com/v2/movie/1291843')
    const movie = yield res.json()
    const summary = movie.summary

    console.log('summary', summary)
})
```