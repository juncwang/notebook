### 使用原生 高德地图 嵌入 vue 项目

1. 在 `index.html` 文件的 `head` 中加入:
    * `<script src="https://webapi.amap.com/maps?v=1.4.15&key=mykey"></script>`

2. 在 vue 项目根目录创建 `vue.config.js` 文件并加入一下代码, 保证 `index.html` 引入的高德 API 内的 `AMap` 有效
```js
module.exports = {
    configureWebpack:{
        externals: {
            'AMap':'AMap'
        }
    },
};
```

3. 在需要使用的 vue 文件内的 `script` 模块内引入 `import AMap from 'AMap'`

4. 在需要使用的 vue 文件内的 `script` 模块内的 `methods` 内使用高德 js API

5. 可以通过 vue 文件的 `script` 模块内的 `mounted` 内加载方法实现进入页面就开始加载高德地图