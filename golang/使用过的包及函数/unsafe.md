### 概述
+ unsafe 包含有关于Go程序类型安全的所有操作.

### 索引

+ `func Sizeof`

### 说明

+ `func Sizeof`
    + `func Sizeof(v ArbitraryType) uintptr`
    + Sizeof 返回被值 v 所占用的字节大小.该大小只是最"顶"的值.例如,若 v 是一个切片,它会返回该切片描述符的大小,而非该切片引用的内存大小