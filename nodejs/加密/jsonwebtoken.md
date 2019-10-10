### jsonwebtoken

* 安装方式
    * `npm install jsonwebtoken --save-dev`

* 导入及使用
```js
// 引入 jsonwebtoken 插件
const jwt = require('jsonwebtoken')

// 定义 token 规则
const role = { 
    username: user.username, email: user.email, role: user.role, avatar: user.avatar, _id: user._id 
    }
// 定义 token 字符串
const secretOrKey = 'secret'
// 定义 token 有效时间
const timeOut = { expiresIn: 3600 }
// 生成 token 字符串
jwt.sign(role, secretOrKey, timeOut, (err, token) => {
    if(err){
        console.log(err)
        res.status(404).json(err)
    }else{
        res.json({ token:token })
    }
})

// 验证 token 字符串
jwt.verify(req.headers.token, secretOrKey, (err, data) => {
        if(err){
            console.log(err)
            res.status(404).json(err)
        }else{
            res.json(data)
        }
    })
```