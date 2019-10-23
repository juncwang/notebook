### 概述
+ builtin 包为Go的预声明标识符提供了文档。此处列出的条目其实并不在builtin 包中，对它们的描述只是为了让 godoc 给该语言的特殊标识符提供文档。

### 索引

+ `type byte byte`
+ `type rune rune`
+ `type string string`
+ `func new(Type) *Type`
+ `func make(Type, size IntegerType) Type`
+ `func len(v Type) int`
+ `func close(c chan<- Type)`
+ `func panic(v interface{})`
+ `func recover() interface{}`

### 说明

+ `type byte byte`
    + 8位无符号整型，是uint8的别名，二者视为同一类型。
+ `type rune rune`
    + 32位有符号整形，int32的别名，二者视为同一类型。
+ `type string string`
    + 8位byte序列构成的字符串，约定但不必须是utf-8编码的文本。字符串可以为空但不能是nil，其值不可变。
+ `func new(Type) *Type`
    + 内建函数new分配内存。其第一个实参为类型，而非值。其返回值为指向该类型的新分配的零值的指针。
+ `func make(Type, size IntegerType) Type`
    + 内建函数make分配并初始化一个类型为切片、映射、或通道的对象。其第一个实参为类型，而非值。make的返回类型与其参数相同，而非指向它的指针。
    + 其具体结果取决于具体的类型：
    ```
    切片：size指定了其长度。该切片的容量等于其长度。切片支持第二个整数实参可用来指定不同的容量；
     它必须不小于其长度，因此 make([]int, 0, 10) 会分配一个长度为0，容量为10的切片。
    映射：初始分配的创建取决于size，但产生的映射长度为0。size可以省略，这种情况下就会分配一个
     小的起始大小。
    通道：通道的缓存根据指定的缓存容量初始化。若 size为零或被省略，该信道即为无缓存的。
    ```
+ `func len(v Type) int`
    + 内建函数len返回 v 的长度
    + 这取决于具体类型
    ```
    数组：v中元素的数量
    数组指针：*v中元素的数量（v为nil时panic）
    切片、映射：v中元素的数量；若v为nil，len(v)即为零
    字符串：v中字节的数量
    通道：通道缓存中队列（未读取）元素的数量；若v为 nil，len(v)即为零
    ```
+ `func close(c chan<- Type)`
    + 内建函数close关闭信道，该通道必须为双向的或只发送的。它应当只由发送者执行，而不应由接收者执行，其效果是在最后发送的值被接收后停止该通道。在最后的值从已关闭的信道中被接收后，任何对其的接收操作都会无阻塞的成功。
    + 对于已关闭的信道，语句：
    ```go
    x, ok := <-c
    ```
+ `func panic(v interface{})`
    + 内建函数panic停止当前Go程的正常执行。当函数F调用panic时，F的正常执行就会立刻停止。F中defer的所有函数先入后出执行后，F返回给其调用者G。G如同F一样行动，层层返回，直到该Go程中所有函数都按相反的顺序停止执行。之后，程序被终止，而错误情况会被报告，包括引发该恐慌的实参值，此终止序列称为恐慌过程。
+ `func recover() interface{}`
    + 内建函数recover允许程序管理恐慌过程中的Go程。在defer的函数中，执行recover调用会取回传至panic调用的错误值，恢复正常执行，停止恐慌过程。若recover在defer的函数之外被调用，它将不会停止恐慌过程序列。在此情况下，或当该Go程不在恐慌过程中时，或提供给panic的实参为nil时，recover就会返回nil。