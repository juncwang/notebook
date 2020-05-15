// 引入模块
const url = require('url')

const myUrl = new URL('http://mywebsite.com:5000/hello.html?id=100&status=active')

// 序列化 url
// console.log(myUrl.href)
// console.log(myUrl.toString())

// host 主机地址:端口
console.log(myUrl.host)

// hostname 主机地址
console.log(myUrl.hostname)

// pathname 路径部分
console.log(myUrl.pathname)

// search 参数部分
console.log(myUrl.search)

// searchparams 参数对象
console.log(myUrl.searchParams)

// append() 添加参数
myUrl.searchParams.append('abc', '123')
console.log(myUrl.searchParams)

// forEach() 遍历参数对象
myUrl.searchParams.forEach((value, key) => {
    console.log(`${key} : ${value}`)
})