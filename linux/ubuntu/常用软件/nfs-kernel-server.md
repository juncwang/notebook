### nfs-kernel-server
* 安装方法 `apt-get install nfs-kernel-server portmap`

* 配置一个服务器文件夹 例如 `/home/wang/linux/nfs/`
* `/etc/exports` 在该文件添加一下内容
    * `/home/wang/linux/nfs *(rw,sync,no_root_squash)` 用户配置的 nfs 文件夹路径

* `/etc/init.d/nfs-kernel-server restart`