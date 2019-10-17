### 概述
+ fmt 包实现了格式化I/O函数，类似于C的 printf 和 scanf. 格式“占位符”衍生自C，但比C更简单

### 索引

+ `func Printf`
+ `func Println`

### 说明

+ `func Printf`
    + `func Printf(format string, a ...interface{}) (n int, err error)`
    + Printf 根据于格式说明符进行格式化并写入到标准输出。 它返回写入的字节数以及任何遇到的写入错误。

+ `func Println`
    + `func Println(a ...interface{}) (n int, err error)`
    + Println 使用其操作数的默认格式进行格式化并写入到标准输出。 其操作数之间总是添加空格，且总在最后追加一个换行符。 它返回写入的字节数以及任何遇到的错误。