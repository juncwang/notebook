### golang 命令
+ OPTIONS 可选参数

##### go build [OPTION] [goFile.go | goPath]
+ 编译并生成可执行文件
    + OPTION
        + -o targetFileName 自定义生成的目标文件名
        + -race 生成的程序执行时会检测同步问题

##### go run goFile.go
+ 编译并执行文件