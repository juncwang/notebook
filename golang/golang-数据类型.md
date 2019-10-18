# 数据类型

### 基本数据类型

+ 数值型
    + 整数类型
        1. int
        2. int8 - 1
        3. int16 - 2
        4. int32 - 4
        5. int64 - 8
        6. uint
        7. uint8 - 1
        8. uint16 - 2
        9. uint32 - 4
        10. uint64 - 8
        11. byte
    + 浮点类型
        1. float32 - 4
        2. float64 - 8
+ 布尔型
    1. bool - 1
+ 字符串
    1. string

### 派生/复杂数据类型

1. 指针 pointer
2. 数组
3. 结构体 struct
4. 管道 channel
5. 函数 func
6. 切片 slice
7. 接口 interface
8. map

### 基本数据类型转换

+ 表达式 T(v) - 将值 v 转换为类型 T
    + `intNum(var)` Num is 8 16 32 64 - var 变量
    + `floatNum(var)` Num is 32 64 - var 变量

### 基本数据类型转 string 类型

1. 使用 fmt 包函数`func Sprint(a ...interface{}) string`
    * `fmt.Sprintf("%d", var)` int 转 string
    * `fmt.Sprintf("%f", var)` float 转 string
    * `fmt.Sprintf("%t", var)` bool 转 string
    * `fmt.Sprintf("%c", var)` byte 转 string

2. 使用 strconv 包函数
    + `strconv.FormatBool(var)` bool 转 string
    + `strconv.FormatInt(var, base)` int 转 string 
        + base 进制 - `10` 表示10进制
    + `strconv.FormatUint(var, base)` float 转 string
        + base 进制 - `10` 表示10进制
    + `strconv.FormatFloat(var, fmt, prec, bitSize)` - float 转 string
        + fmt 输出格式 - `'f'`
        + prec 保留小数点后几位 - `10`
        + bitSize 使用哪种 float 进行转换 - `64` 表示采用 float64
    + `strconv.Itoa(var)` int 转 string 
        + 只能用 int 类型 - int64等类型都无法使用

### string 类型转基本数据类型

1. 使用 strconv 包函数
    + `strconv.ParseBool(str string) (value bool, err error)` string 转 bool
    + `strconv.ParseInt(s string, base int, bitSize int) (i int64, err error)` string 转 int
        + base 进制 - `10` 表示10进制
        + bitSize 使用哪种 int 进行转换 - `64` 表示采用 int64
    + `strconv.ParseUint(s string, base int, bitSize int) (n uint64, err error)` string 转 无符号 int
        + base 进制 - `10` 表示10进制
        + bitSize 使用哪种 uint 进行转换 - `64` 表示采用 uint64
    + `strconv.ParseFloat(s string, bitSize int) (f float64, err error)` string 转 float
        + bitSize 使用哪种 float 进行转换 - `64` 表示采用 float64
    + `strconv.Atoi(var)` string 转 int