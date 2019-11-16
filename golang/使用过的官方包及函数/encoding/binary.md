### 概述
+ binary包实现了简单的数字与字节序列的转换以及变长值的编解码。
+ 数字翻译为定长值来读写，一个定长值，要么是固定长度的数字类型（int8, uint8, int16, float32, complex64, ...）或者只包含定长值的结构体或者数组。
+ 变长值是使用一到多个字节编码整数的方法，绝对值较小的数字会占用较少的字节数。详情请参见：http://code.google.com/apis/protocolbuffers/docs/encoding.html。
+ 本包相对于效率更注重简单。如果需要高效的序列化，特别是数据结构较复杂的，请参见更高级的解决方法，例如encoding/gob包，或者采用协议缓存

### 索引

+ `Variables`
+ `type ByteOrder interface`

### 说明

+ `Variables`
    ```go
    var BigEndian bigEndian
    ```
    + 大端字节序的实现, 它实现了 `ByteOrder` 接口
    ```go
    var LittleEndian littleEndian
    ```
    + 小端字节序的实现, 它实现了 `ByteOrder` 接口

+ `type ByteOrder interface`
    ```go
    type ByteOrder interface {
        Uint16([]byte) uint16
        Uint32([]byte) uint32
        Uint64([]byte) uint64
        PutUint16([]byte, uint16)
        PutUint32([]byte, uint32)
        PutUint64([]byte, uint64)
        String() string
    }
    ```
    + ByteOrder规定了如何将字节序列和 16、32或64比特的无符号整数互相转化