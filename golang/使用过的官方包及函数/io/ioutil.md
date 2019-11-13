### 概述
+ 软件包 ioutil 实现了一些 i/o 实用程序功能。

### 索引

+ `func ReadFile(filename string) ([]byte, error)`
+ `func WriteFile(filename string, data []byte, perm os.FileMode) error`

### 说明

+ `func ReadFile(filename string) ([]byte, error)`
    + ReadFile 从filename指定的文件中读取数据并返回文件的内容。成功的调用返回的err为nil而非EOF。因为本函数定义为读取整个文件，它不会将读取返回的EOF视为应报告的错误。
+ `func WriteFile(filename string, data []byte, perm os.FileMode) error`
    + 函数向filename指定的文件中写入数据。如果文件不存在将按给出的权限创建文件，否则在写入数据之前清空文件。
