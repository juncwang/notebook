### mongoose

* 安装方式
    * `npm install mongoose --save-dev`

##### mongo 数据库基础操作
* 配置文件
```cfg
# 配置数据库端口号及ip地址, 如果全为0表示外网无法访问
# net:
  # port: 27017
  # bindIp: 0.0.0.0

# 开启全新验证只能通过对应的密码账户才能访问数据库
# security:
  # authorization: enabled
```
* 基础操作
    * 创建用户
        1. `use admin`
        2. `db.auth("user","pwd")`
        3. 系统管理员 `db.createUser({user:"admin",pwd:"admin",roles:[{role:"userAdminAnyDatabase",db:"admin"}]})` 
        4. 数据管理员 `db.createUser({user:"user",pwd:"pwd",roles:[{role:"readWrite",db:"dbName"}]})`
        5. 删除管理员 `db.dropUser("user")`
    * 查看集合 `show dbs`
    * 使用集合 `use dbName`
    * 查看表   `show collections`
    * 删除集合 `db.dropDatabase()`
    * 删除表   `db.user.drop()`
    * 插入数据 `db.users.insert({name:"tom",pwd:"123",sex:"m"}) `
    * 删除数据 `db.users.remove({name:"lili2"})`
    * 更新数据 `db.users.update({name:"lili"},{$set:{age:23}})`
        1. 更新第一条数据 `db.student.update({"name":"小明"},{$set:{"age":16}})`
        2. 更新查询的所有数据 `db.student.update({"sex":"男"},{$set:{"age":33}},{multi: true})`
        3. 完整替换 `db.student.update({"name":"小明"},{"name":"大明","age":16})`
    * 查询数据 `db.users.find()`
        1. age == 22 `db.userInfo.find({"age": 22})`
        2. age > 22 `db.userInfo.find({age: {$gt: 22}})`
        3. age < 22 `db.userInfo.find({age: {$lt: 22}})`
        4. age >= 25 `db.userInfo.find({age: {$gte: 25}})`
        5. age <= 25 `db.userInfo.find({age: {$lte: 25}})`
        6. age >= 23 & age <= 26 `db.userInfo.find({age: {$gte: 23, $lte: 26}})`
        7. name 包含 mongo `db.userInfo.find({name: /mongo/})`
        8. name 开头是 mongo `db.userInfo.find({name: /^mongo/})`
        9. 升序 `db.userInfo.find().sort({age: 1})`
        10. 降序 `db.userInfo.find().sort({age: -1})`
        11. 查询前5条数据 `db.userInfo.find().limit(5)`
        12. 查询10条以后数据 `db.userInfo.find().skip(10)`
        13. 查询 5-10 之间数据 `db.userInfo.find().limit(10).skip(5)`
        14. 或查询 `db.userInfo.find({$or: [{age: 22}, {age: 25}]})`
        15. 统计数据结果 `db.userInfo.find({age: {$gte: 25}}).count()`

* 使用链接数据库
```js
// 引入 mongoose 插件
const mongoose = require('mongoose')
// 定义链接地址
const mongoURI = 'mongodb://数据库管理员账户:密码@127.0.0.1:27017/表名?authSource=admin'
// 链接数据库
mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("MongoDB Connect Success"))
    .catch((err) => console.log(`MongoDB Connect Failure ${err}`))
```

* Schema 创建
```js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    // 数据名称
    username: {
        // 数据类型
        type: String,
        // 必须有的值
        // default: xxx 表示如果没有放入 xxx 默认值
        // 不写这行表示可以不需要这个数据
        required: true
    }
})

// 建立数据表模型并公布出去
module.exports = User = mongoose.model('users', UserSchema)
```

* 添加数据
```js
const User = require('./模型地址')
const newUser = new User({模型数据})

// 保存新数据
newUser.save()
    .then(user => {})
    .catch(err => {})
```

* 删除数据
```js
const User = require('./模型地址')

// 根据属性查找一个数据并删除
User.findOneAndRemove({ att })
    .then(user => {
        user.save()
            .then(user => {})
            .catch(err => {})
    })
    .catch(err => {})

// 根据 id 查找一个数据并删除
User.findByIdAndRemove(id)
    .then(user => {
        user.save()
            .then(user => {})
            .catch(err => {})
    })
    .catch(err => {})
```

* 修改数据
```js
const User = require('./模型地址')
const newUser = new User({模型数据})

// 根据属性查找一条数据并修改
User.findOneAndUpdate(
    { att }, // 根据属性进行查找
    { $set: newUser }, // 需要更新的数据
    { new: true }   // 是否是新的
)
    .then(user => {})
    .catch(err => {})

// 根据 id 查找一条数据并修改
User.findByIdAndUpdate(
    id, // 根据 id 进行查找
    { $set: newUser }, // 需要更新的数据
    { new: true }   // 是否是新的
)
    .then(user => {})
    .catch(err => {})
```

* 查询数据
```js
const User = require('./模型地址')

// 根据属性查询一条有以下属性的数据
User.findOne(att})
    .then(user => {})
    .catch(err => {})

// 根据 id 查找数据
User.findById(id)
    .then(user => {})
    .catch(err => {})
```

* 获取数据 id 的方法
```js
user._id.toHexString()
```
