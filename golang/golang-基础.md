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

+ uintprt ?

### break, continue, goto, return

1. break
    + break 默认会跳出最近的 for 循环
    + break 后面可以指定标签, 跳出标签对应的 for 循环

```go
lable:
for i := 0; i < 9; i++ {
    for j := 0; j < 9; j++ {
        // break 跳出最近的 for 循环
        // break lable 跳出有 lable: 标签的 for 循环
    }
}
```

2. continue
    + continue 语句用于结束本地循环, 继续执行下一次循环
    + continue 语句出现在多层嵌套的循环语句体中时, 可以通过标签指明要跳过的是哪一层循环, 这个和签名的 break 标签的使用规则一样

3. goto
    + Go 语言的 goto 语句可以无条件地转移到程序中指定的行
    + goto 语句通常与条件语句配合使用. 可以用来实现条件转移, 跳出循环体等功能.
    + 在 Go 语言设计中一般不主张使用 goto 语句, 以免造成程序流程的混乱, 使理解和调试程序都产生困难

```go
fmt.Println("程序开始输出")
goto label
fmt.Println("因为 goto 语句不会被输出")
label:
fmt.Println("goto 语句跳至 label 后继续输出")
```

4. return
    + return 使用在方法或函数中, 表示跳出所在的方法或函数

5. 常量, 变量
    + 常量使用 `const` 修饰
    + 变量使用 `var` 修饰