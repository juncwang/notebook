### koa

* 安装方式
    * `npm install koa --save-dev`

* 使用方法
```js
const Koa = require('koa')
const app = new Koa()

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

const Router = require('koa-router')
const router = new Router()
app.use(router.routes())
app.use(router.allowedMethods())

const mongoose = require('mongoose')
const mongodbURI = require('./config/keys').mongodbURI
mongoose.connect(mongodbURI, {useNewUrlParser: true})
    .then(() => console.log(`Mongodb Connect Success`))
    .catch(err => console.log(err))

const test = require('./routes/api/test')
router.use('/test', test)

router.get('/router', async (ctx, next) => {
    ctx.body = 'hello router'
})

app.use(async (ctx, next) => {
    ctx.body = 'hello koa'
})

port = 5000

app.listen(port, () => {
    console.log(`Server Running On Port ${port}`)
})
```

* router 使用方法
```js
const Router = require('koa-router')
const router = new Router()

const multiparty = require('koa2-multiparty')

router.get('/get', async (ctx, next) => {
    ctx.body = 'router test success'
})

router.post('/post', async (ctx, next) => {
    let data = ctx.request.body

    ctx.body = data
})

router.post('/multiparty',multiparty(), async (ctx, next) => {
    console.log('multiparty log')

    console.log(ctx.req.body, ctx.req.files)

    ctx.body = 'multiparty success'
})

module.exports = router.routes()
```