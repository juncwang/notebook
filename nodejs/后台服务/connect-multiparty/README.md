### connect-multiparty

* 安装方式
    * `npm install connect-multiparty --save-dev`

* 使用方式

```js
// 在 server.js 内配置
// 上传文件
const multiparty = require('connect-multiparty')
// 定义上传的路径 - 如果使用 fs 来控制文件就可以不需要设置
app.use(multiparty({uploadDir: './updata/'}))
```
```js
// 在路由内使用
const express = require('express')
const router = express.Router()

const multiparty = require('connect-multiparty')
const multipartyMiddeware = multiparty()

router.post('/upload', multipartyMiddeware, (req, res) => {
    console.log(req.files)

    // 获取文件名字
    // let filesData = req.files.file.path.split('\\')
    // let fileName = filesData[filesData.length - 1]

    // req.files.file.path 文件路径 可以使用文件流进行调整
    // var source = fs.createReadStream(req.files.file.path);
    // var dest = fs.createWriteStream('./文件目录/' + fileName); 
    // source.pipe(dest)
    // 删除临时文件
    // source.on('end', function() { fs.unlinkSync(req.files.file.path);});   //delete
    // source.on('error', function(err) {  });

    res.json({msg: 'success'})
})
```

```js
// 前端上传方法
let files = [...input.files]
let file = files[0]
let formdata = new FormData()
formdata.append('file',file)
formdata.append('submit',false)
let config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}
this.$axios.post('/api/files/upload', formdata, config)
    .then(res => {
        // console.log(res.data)
        if(this.imgs.length > 0){
            console.log(this.imgs.length)
            this.uploadfile()
            
        }else{
            console.log('hello world')
        }
    })
```