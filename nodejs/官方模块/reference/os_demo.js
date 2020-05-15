// 引入模块
const os = require('os')

// os.platform() 返回标示操作系统平台的字符串
console.log(os.platform())

// os.arch() 返回 cpu 架构
console.log(os.arch())

// os.cpus() 返回 cpu 内核信息
console.log(os.cpus())

// os.freemem() 返回系统空闲内存
console.log(os.freemem())

// os.totalmem() 返回系统内存总量
console.log(os.totalmem())

// os.homedir() 返回用户主目录
console.log(os.homedir())

// os.uptime() 返回系统正常运行时间(秒)
console.log(os.uptime())