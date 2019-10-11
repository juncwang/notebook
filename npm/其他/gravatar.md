### gravatar

* 安装方式
    * `npm install gravatar --save-dev`

* 使用方式
```js
// 引入 gravatar 插件
const gravatar = require('gravatar')
// 返回 gravatar 头像库的图片地址
const avatar = gravatar.url('emerleite@gmail.com', {s: '200', r: 'pg', d: 'mm'})
```