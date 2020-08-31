### vsftpd
* 安装方法 `apt-get install vsftpd`



##### 配置文件
* `/etc/vsftpd.conf` vsftpd 配置文件
    * `local_enable=YES` 
    * `write_enable=YES` 

##### 重启服务
* `/etc/init.d/vsftpd restart`

##### 安装客户端连接软件
* `FileZilla` 免费软件 `https://www.filezilla.cn/download/client`
* 点击 文件 - 站点管理器 - 新建站点
* 输入 ip 地址 加密改为明文 输入账户密码