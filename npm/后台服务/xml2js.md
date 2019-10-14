### xml2js

* 安装方式
    * `npm install xml2js --save-dev`

* 导入及使用
```js
const { parseString } = require('xml2js')

// 将 xml 字符串转化为 js 数据
parseString(xmlData, {trim: true}, (err, data) => {
    // data 为解析后的 js 数据
})
```