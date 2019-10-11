### jwt-decode

* 安装方式
    * `npm install decode --save-dev`

* 使用方法
```js
const jwtDecode = require('jwt-decode')
// 解析 token 并给与 data
const data = jwtDecode(token)
```