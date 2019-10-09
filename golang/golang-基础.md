### 官方网址

+ `https://golang.google.cn/dl/` 下载地址
+ `https://tour.go-zh.org/basics/1` 官方教程
+ `https://go-zh.org/pkg/` 中文文档

### 配置

1. GOROOT   指定 SDK 的安装路径(下载解压后的根目录)
2. Path     添加 SDK 的 /bin 目录
3. GOPATH   工作目录, 将来我们的 go 项目路径

##### windows 
1. 配置内新建 `GOROOT=d:\go`
2. 配置内编辑 `Path` 添加 `;%GOROOT%\bin`
3. 配置工作目录 `GOPATH=d:\goProject`

##### Linux MacOs
+ 打开系统配置文件 `vi /etc/profile`
```profile
export GOROOT=/usr/local/go
export PATH=$PATH:$GOROOT/bin
exprot GOPATH=$HOME/goProject
```