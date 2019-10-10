### 基础软件安装

+ c++ 编译器
    1. `yum install -y gcc`
    2. `yum install -y gcc-c++`

+ curl 
    + `yum install -y curl`
        + `$ curl [options] http://url` 从网站获取网页信息
            + options
                + -s 获取网站部分信息
                + -i 获取网站头信息

+ vim 编辑器
    + `yum install -y vim`
        + `$ vim filename` 创建或打开一个文件进行编辑

+ net-tools 网络工具包
    + `yum install -y net-tools`
        + `$ ifconfig` 查看本机 ip 