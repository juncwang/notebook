### fs

* 本插件无需安装, 在安装 `nodejs` 时会一并安装

* 方法 `promisify` 适用于需要回调的方法使用 Promis
```js
const fs = require('fs')
const util = require('util')

// (需要调用的方法)(需要给方法传递的参数)
util.promisify(fs.readFile)('./package.json')
    .then(JSON.parse)
    .then(data => {
        console.log(data.name)
    })
    .catch(err => {
        console.log(err)
    })
```
```js
// 将异步代码进行同步书写
const fs = require('fs');
const util = require('util');
// 要调用的方法
const readAsync = util.promisify(fs.readFile)

async function init(){
    try{
        // 需要给方法传递的参数
        let data = await readAsync('./package.json')
        data = JSON.parse(data)
        console.log(data.name)
    }catch(err){
        console.log(err)
    }
}

init()
```