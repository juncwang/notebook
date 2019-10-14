### request-promise-native

- 说明: request-promise-native 是对 request 的封装, 所以需要安装 request

- 安装方式

  - `npm install request --save-dev`
  - `npm install request-promise-native --save-dev`

- 基本用法

```js
// 只需要引入 request-promise-native
const rp = require('request-promise-native')

rp{(
        method: 'GET',          // 请求的方法
        uri: url,               // 请求的地址?
        url: url,               // 请求的地址?
        qs: {test:'123'},       // get 请求数据 ?test=123
        body: {some: 'payload'} // post 请求数据
        form: {name: 'Josh'},   // post http form 类型请求数据
        formData: {             // 上次文件
            name: 'Jenn',
            file: {
            value: fs.createReadStream('test/test.jpg'),
            options: {
                filename: 'test.jpg',
                contentType: 'image/jpg'
                }
            }
        },
        json: true              // 请求数据的形式
        headers: {'User-Agent':'Request-Promise'} // 请求头
)}
    .then( res => {             // 请求成功返回 res
        console.log(res)
    })
    .catch(err => {             // 请求失败返回 err
        console.log(err)
    })
```
