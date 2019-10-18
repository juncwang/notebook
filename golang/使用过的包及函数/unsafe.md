### 概述
+ unsafe包提供了一些跳过go语言类型安全限制的操作。

### 索引

+ `func Sizeof(v ArbitraryType) uintptr`

### 说明

+ `func Sizeof(v ArbitraryType) uintptr`
    + Sizeof返回类型v本身数据所占用的字节数。返回值是“顶层”的数据占有的字节数。例如，若v是一个切片，它会返回该切片描述符的大小，而非该切片底层引用的内存的大小