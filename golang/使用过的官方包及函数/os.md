### 概述
+ os包提供了操作系统函数的不依赖平台的接口。设计为Unix风格的，虽然错误处理是go风格的；失败的调用会返回错误值而非错误码。通常错误值里包含更多信息。例如，如果某个使用一个文件名的调用（如Open、Stat）失败了，打印错误时会包含该文件名，错误类型将为*PathError，其内部可以解包获得更多信息。
+ os包的接口规定为在所有操作系统中都是一致的。非公用的属性可以从操作系统特定的syscall包获取。

### 索引

+ `Constants`

+ `Variables`

+ `type FileMode uint32`

+ `type FileInfo`
    + `func Stat(name string) (fi FileInfo, err error)`

+ `func IsNotExist(err error) bool`

+ `type File`
    + `func Create(name string) (file *File, err error)`
    + `func Open(name string) (file *File, err error)`
    + `func OpenFile(name string, flag int, perm FileMode) (file *File, err error)`
    + `func (f *File) Close() error`

### 说明

+ `Constants`
    ```go
    const (
        O_RDONLY int = syscall.O_RDONLY // 只读模式打开文件
        O_WRONLY int = syscall.O_WRONLY // 只写模式打开文件
        O_RDWR   int = syscall.O_RDWR   // 读写模式打开文件
        O_APPEND int = syscall.O_APPEND // 写操作时将数据附加到文件尾部
        O_CREATE int = syscall.O_CREAT  // 如果不存在将创建一个新文件
        O_EXCL   int = syscall.O_EXCL   // 和O_CREATE配合使用，文件必须不存在
        O_SYNC   int = syscall.O_SYNC   // 打开文件用于同步I/O
        O_TRUNC  int = syscall.O_TRUNC  // 如果可能，打开时清空文件
    )
    ```

+ `Variables`
    ```go
    var (
        ErrInvalid    = errors.New("invalid argument")
        ErrPermission = errors.New("permission denied")
        ErrExist      = errors.New("file already exists")
        ErrNotExist   = errors.New("file does not exist")
    )
    ```
    + 一些可移植的、共有的系统调用错误
    ```go
    var (
        Stdin  = NewFile(uintptr(syscall.Stdin), "/dev/stdin")
        Stdout = NewFile(uintptr(syscall.Stdout), "/dev/stdout")
        Stderr = NewFile(uintptr(syscall.Stderr), "/dev/stderr")
    )
    ```
    + Stdin、Stdout和Stderr是指向标准输入、标准输出、标准错误输出的文件描述符
    ```go
    var Args []string
    ```
    + Args保管了命令行参数，第一个是程序名。

+ `type FileMode uint32`
    + FileMode代表文件的模式和权限位。这些字位在所有的操作系统都有相同的含义，因此文件的信息可以在不同的操作系统之间安全的移植。不是所有的位都能用于所有的系统，唯一共有的是用于表示目录的ModeDir位。
    ```go
    const (
        // 单字符是被String方法用于格式化的属性缩写。
        ModeDir        FileMode = 1 << (32 - 1 - iota) // d: 目录
        ModeAppend                                     // a: 只能写入，且只能写入到末尾
        ModeExclusive                                  // l: 用于执行
        ModeTemporary                                  // T: 临时文件（非备份文件）
        ModeSymlink                                    // L: 符号链接（不是快捷方式文件）
        ModeDevice                                     // D: 设备
        ModeNamedPipe                                  // p: 命名管道（FIFO）
        ModeSocket                                     // S: Unix域socket
        ModeSetuid                                     // u: 表示文件具有其创建者用户id权限
        ModeSetgid                                     // g: 表示文件具有其创建者组id的权限
        ModeCharDevice                                 // c: 字符设备，需已设置ModeDevice
        ModeSticky                                     // t: 只有root/创建者能删除/移动文件
        // 覆盖所有类型位（用于通过&获取类型位），对普通文件，所有这些位都不应被设置
        ModeType = ModeDir | ModeSymlink | ModeNamedPipe | ModeSocket | ModeDevice
        ModePerm FileMode = 0777 // 覆盖所有Unix权限位（用于通过&获取类型位）
    )
    ```

+ `type FileInfo`
    ```go
    type FileInfo interface {
        Name() string       // 文件的名字（不含扩展名）
        Size() int64        // 普通文件返回值表示其大小；其他文件的返回值含义各系统不同
        Mode() FileMode     // 文件的模式位
        ModTime() time.Time // 文件的修改时间
        IsDir() bool        // 等价于Mode().IsDir()
        Sys() interface{}   // 底层数据来源（可以返回nil）
    }
    ```
    + FileInfo用来描述一个文件对象。

    + `func Stat(name string) (fi FileInfo, err error)`
        + Stat返回一个描述name指定的文件对象的FileInfo。如果指定的文件对象是一个符号链接，返回的FileInfo描述该符号链接指向的文件的信息，本函数会尝试跳转该链接。如果出错，返回的错误值为*PathError类型。使用 `func IsNotExist(err error) bool` 判断文件是否存在

+ `func IsNotExist(err error) bool`
    + 返回一个布尔值说明该错误是否表示一个文件或目录不存在。ErrNotExist和一些系统调用错误会使它返回真。

+ `type File`
    + File代表一个打开的文件对象。
    + `func Create(name string) (file *File, err error)`
        + Create采用模式0666（任何人都可读写，不可执行）创建一个名为name的文件，如果文件已存在会截断它（为空文件）。如果成功，返回的文件对象可用于I/O；对应的文件描述符具有O_RDWR模式。如果出错，错误底层类型是*PathError。
    + `func Open(name string) (file *File, err error)`
        + Open打开一个文件用于读取。如果操作成功，返回的文件对象的方法可用于读取数据；对应的文件描述符具有O_RDONLY模式。如果出错，错误底层类型是*PathError。
    + `func OpenFile(name string, flag int, perm FileMode) (file *File, err error)`
        + OpenFile是一个更一般性的文件打开函数，大多数调用者都应用Open或Create代替本函数。它会使用指定的选项（如O_RDONLY等）、指定的模式（如0666等）打开指定名称的文件。如果操作成功，返回的文件对象可用于I/O。如果出错，错误底层类型是*PathError。
    + `func (f *File) Close() error`
        + Close关闭文件f，使文件不能用于读写。它返回可能出现的错误。