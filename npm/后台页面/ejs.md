### ejs

* 安装方式
    * `npm install ejs --save-dev`

* 配置 ejs 到 express 内, 并渲染
```js
// 配置模板资源目录
app.set('views', './views')
// 配置模板引擎
app.set('view engine', 'ejs')

// 页面路由
app.get('/search', (req, res) => {
    // 渲染页面, 将渲染好的页面返回给用户
    res.render('search')
})
```