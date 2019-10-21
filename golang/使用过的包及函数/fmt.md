### 概述
+ fmt包实现了类似C语言printf和scanf的格式化I/O。格式化动作（'verb'）源自C语言但更简单。

+ 通用
```
%v	值的默认格式表示
%+v	类似%v，但输出结构体时会添加字段名
%#v	值的Go语法表示
%T	值的类型的Go语法表示
%%	百分号
```
+ 布尔值
```
%t	单词true或false
```
+ 整数
```
%b	表示为二进制
%c	该值对应的unicode码值
%d	表示为十进制
%o	表示为八进制
%q	该值对应的单引号括起来的go语法字符字面值，必要时会采用安全的转义表示
%x	表示为十六进制，使用a-f
%X	表示为十六进制，使用A-F
%U	表示为Unicode格式：U+1234，等价于"U+%04X"
```
+ 浮点数与复数的两个组分
```
%b	无小数部分、二进制指数的科学计数法，如-123456p-78；参见strconv.FormatFloat
%e	科学计数法，如-1234.456e+78
%E	科学计数法，如-1234.456E+78
%f	有小数部分但无指数部分，如123.456
%F	等价于%f
%g	根据实际情况采用%e或%f格式（以获得更简洁、准确的输出）
%G	根据实际情况采用%E或%F格式（以获得更简洁、准确的输出）
```
+ 字符串和[]byte
```
%s	直接输出字符串或者[]byte
%q	该值对应的双引号括起来的go语法字符串字面值，必要时会采用安全的转义表示
%x	每个字节用两字符十六进制数表示（使用a-f）
%X	每个字节用两字符十六进制数表示（使用A-F）
```
+ 指针
```
%p	表示为十六进制，并加上前导的0x
```

+ 默认输出宽度及精度
```
%f:    默认宽度，默认精度
%9f    宽度9，默认精度
%.2f   默认宽度，精度2
%9.2f  宽度9，精度2
%9.f   宽度9，精度0
```

### 索引

+ `func Printf(format string, a ...interface{}) (n int, err error)`
+ `func Println(a ...interface{}) (n int, err error)`
+ `func Sprint(a ...interface{}) string`
+ `func Scanf(format string, a ...interface{}) (n int, err error)`
+ `func Scanln(a ...interface{}) (n int, err error)`

### 说明

+ `func Printf(format string, a ...interface{}) (n int, err error)`
    + Printf根据format参数生成格式化的字符串并写入标准输出。返回写入的字节数和遇到的任何错误
+ `func Println(a ...interface{}) (n int, err error)`
    + Println采用默认格式将其参数格式化并写入标准输出。总是会在相邻参数的输出之间添加空格并在输出结束后添加换行符。返回写入的字节数和遇到的任何错误
+ `func Sprint(a ...interface{}) string`
    + Sprintf根据format参数生成格式化的字符串并返回该字符串
+ `func Scanf(format string, a ...interface{}) (n int, err error)`
    + Scanf从标准输入扫描文本，根据format 参数指定的格式将成功读取的空白分隔的值保存进成功传递给本函数的参数。返回成功扫描的条目个数和遇到的任何错误
+ `func Scanln(a ...interface{}) (n int, err error)`
    + Scanln类似Scan，但会在换行时才停止扫描。最后一个条目后必须有换行或者到达结束位置