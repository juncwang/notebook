### 概述
+ flag包实现了命令行参数的解析。

### 索引

+ `func IntVar(p *int, name string, value int, usage string)`
+ `func StringVar(p *string, name string, value string, usage string)`
+ `func Parse()`

### 说明

+ `func IntVar(p *int, name string, value int, usage string)`
    + IntVar用指定的名称、默认值、使用信息注册一个int类型flag，并将flag的值保存到p指向的变量。
+ `func StringVar(p *string, name string, value string, usage string)`
    + StringVar用指定的名称、默认值、使用信息注册一个string类型flag，并将flag的值保存到p指向的变量。
    
+ `func Parse()`
    + 从os.Args[1:]中解析注册的flag。必须在所有flag都注册好而未访问其值时执行。未注册却使用flag -help时，会返回ErrHelp。

