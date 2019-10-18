### 官方网址

+ `https://golang.google.cn/dl/` 下载地址
+ `https://tour.go-zh.org/basics/1` 官方教程
+ `https://go-zh.org/pkg/` 中文文档
+ `https://studygolang.com/pkgdoc` 中文文档

### 配置

1. GOROOT   指定 SDK 的安装路径(下载解压后的根目录)
2. Path     添加 SDK 的 /bin 目录
3. GOPATH   工作目录, 将来我们的 go 项目路径

##### windows 
1. 配置内新建 `GOROOT=d:\go`
2. 配置内编辑 `Path` 添加 `;%GOROOT%\bin`
3. 配置工作目录 `GOPATH=d:\goProject`

##### Linux MacOs
+ 打开系统配置文件 `vi /etc/profile`
```profile
export GOROOT=/usr/local/go
export PATH=$PATH:$GOROOT/bin
exprot GOPATH=$HOME/goProject
```

### 关键字
+ break		
+ default		
+ func			
+ interface		
+ select
+ case			
+ defer		
+ go			
+ map			
+ struct
+ chan		
+ else			
+ goto			
+ package		
+ switch
+ const		
+ fallthough		
+ if			
+ range		
+ type
+ continue		
+ for			
+ import		
+ retrun		
+ var

### 内置函数

+ append(arr slice, var) slice // 为数组添加元素
+ []byte(str string) []byte // 把字符串转换成 byte 数组
+ cap(sli slice) int // 返回 slice 的最大长度
+ copy(sli1 slice, sli2 slice) // 把 sli2 内容拷贝到 sli1
+ close(ch chan) // 主要用来关闭 channel，关闭后就无法写入值
+ delete(m map, key string) // 删除 map 的键值对
+ float32(var) float32 // 强制转换为 float32 类型
+ int(var) int // 强制转换为 int 类型
+ len(var) int // 返回变量的长度
+ new(int) &int // 用来分配内存, 主要来分配值类型, 比如 int,struct 
+ make(chan int,num int) chan int // 用来分配内存, 主要来分配引用类型, 比如 chan,map,slice
+ panic(err error) // 用来做错误处理, 中断程序并指出错误
+ print(str string) // 打印一个字符串
+ recover() err // 用来做错误处理, 不终段程序仅把错误返回
+ []rune(str string) []byte // 把字符串转换成 byte 数组(主要用于长度大于1的文字)
+ string(变量) string // 强制转换为 string 类型