### body-parser

* 安装方式
    * `npm install parser --save-dev`

* 使用后就可以在 router 内解析 body 的内容 `req.body`
```js
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false, limit: '100mb'}))
app.use(bodyParser.json(limit: '100mb'))
```
