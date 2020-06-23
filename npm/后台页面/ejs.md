### ejs

* 安装方式
    * `npm install ejs --save-dev`

* 配置 ejs 到 express 内, 并渲染
```js
// 配置模板资源目录
app.set('views', './views')
// 配置模板引擎
app.set('view engine', 'ejs')
// 让服务器能够识别外部样式表
app.use('/path', express.static('path'))

// 页面路由
app.get('/path', (req, res) => {
    let data = {age: 25, name: 'Summer', arr: []}
    // 渲染页面, 将渲染好的页面返回给用户
    res.render('ejsPageName', data)
})
```

```html
<html>
    <body>
        <%- include('./filename.ejs') %>
        <h1><%= name %></h1>

        <% data.forEach(item => { %>
            <li><%=item %></li>
        <% }) %>
    </body>
</html>
```

```html
<!-- ejs模板 -->
<nav>
    ejs公共模板
</nav>
```