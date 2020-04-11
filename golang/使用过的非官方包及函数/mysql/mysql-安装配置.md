### 安装 mysql 插件

+ 在 go 环境变量路径下执行 `go get https://github.com/go-sql-driver/mysql` 进行安装

+ `import ( _ "https://github.com/go-sql-driver/mysql")` 只需要引入 mysql 驱动就可以, 一切操作由 database/sql 执行

+ 可以直接在以下地址下载 `https://github.com/go-sql-driver/mysql` 并放入程序