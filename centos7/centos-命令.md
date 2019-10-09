+ OPTIONS 可选参数

### 系统命令

##### ps [OPTIONS] 
+ 查看当前正在运行的进程
    + OPTIONS
        + -ef 查看系统所有进程

##### top
+ 查看系统当前运行进程

##### whereis 软件名
+ 查找软件安装位置

##### uname [OPTIONS] 
+ 查看系统版本
    + OPTIONS
        + -r 系统版本号
        + -a 系统完整版本号




### 文件命令

##### pwd
+ 查看当前目录路径

##### ls [OPTIONS]
+ 查看目录下文件
    + OPTIONS
     + -a 查看所有文件
     + -l 以列表形式查看文件详情

##### mkdir [OPTIONS] 文件路径
+ 创建文件路径
    + OPTIONS
        + -p 容许创建多级

##### touch 文件名
+ 创建文件

##### rm [OPTIONS] 文件名/路径
+ 删除文件或路径
    + OPTIONS
        - -rf 强制删除

##### chmod [OPTIONS] 文件
+ 为文件添加或删除权限
    + OPTIONS
        + num 快速添加用户组权限, 一共三个用户组-用户u, 组g, 其他o 例如:`chmod 755 文件` (r=4, w=2, x=1) 7表示所有权限权重相加
        + +x(-x) 添加删除执行权限
        + +r(-r) 添加删除读权限
        + +w(-w) 添加删除写权限




### 解压命令

##### tar -zxvf 压缩文件
+ 解压 .tar.gz 文件

##### unzip 压缩文件
+ 解压 .zip 文件



### 安装命令

##### yum [OPTIONS] [softwareName]
+ 安装软件包
    + 必选 OPTIONS
        + install: 安装软件
        + remove: 卸载软件
        + search: 搜索软件
        + update: 更新系统
        + makecache: 将服务器上的软件包信息缓存到本地, 提高搜索安装软件的速度
    + OPTIONS
        + -y: 所有提示都确定

