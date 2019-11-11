### 概述
+ os包提供了操作系统函数的不依赖平台的接口。设计为Unix风格的，虽然错误处理是go风格的；失败的调用会返回错误值而非错误码。通常错误值里包含更多信息。例如，如果某个使用一个文件名的调用（如Open、Stat）失败了，打印错误时会包含该文件名，错误类型将为*PathError，其内部可以解包获得更多信息。
+ os包的接口规定为在所有操作系统中都是一致的。非公用的属性可以从操作系统特定的syscall包获取。

### 索引

+ `type File`
    + `func Open(name string) (file *File, err error)`
    + `func (f *File) Close() error`

### 说明

+ `type File`
    + File代表一个打开的文件对象。
    + `func Open(name string) (file *File, err error)`
        + Open打开一个文件用于读取。如果操作成功，返回的文件对象的方法可用于读取数据；对应的文件描述符具有O_RDONLY模式。如果出错，错误底层类型是*PathError。
    + `func (f *File) Close() error`
        + Close关闭文件f，使文件不能用于读写。它返回可能出现的错误。