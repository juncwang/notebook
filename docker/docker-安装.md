### 官方网站

+ 主页 `https://www.docker.com/`
+ 文档 `https://docs.docker.com/`

### 各平台的安装

+ 各平台安装说明 - 网站文档内路径 `Get Docker -> Docker Engine - Community`

##### centos7 安装

1. centos7 必须是 64 位版本
2. 使用 yum 安装一下两个软件
    1. `yum -y install gcc`
    2. `yum -y install gcc-c++`
3. 卸载 docker-v19.03 之前的版本
    + `$ sudo yum remove docker \ 
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine`
4. 安装需要的软件包
    + `$ sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2`
5. 设置 stable 镜像仓库 (选择其中一个执行)
    + 官网下载 (不推荐)
        + `$ sudo yum-config-manager \
                    --add-repo \
                    https://download.docker.com/linux/centos/docker-ce.repo`
    + 阿里云下载 (推荐)
        + `$ sudo yum-config-manager \
                    --add-repo \
                    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo`
6. 更新 yum 软件包索引
    + `$ sudo yum makecache fast`
7. 安装 docker-ce
    + `$ sudo yum -y install docker-ce docker-ce-cli containerd.io`
8. 启动 docker
    + `$ sudo systemctl start docker`
9. 测试 docker
    + `$ docker run hello-world`
10. 配置镜像加速
    1. `mkdir -p /etc/docker`
    2. `vim /etc/docker/daemon.json`
        1. 网易云 `{"registry-mirrors":["http://hub-mirror.c.163.com"]}`
        2. 阿里云 `{"registry-mirrors":["https://自己的编码.mirror.aliyuncs.com"]}`
    3. 重新加载配置 `systemctl daemon-reload`
    4. 重启 docker `systemctl restart docker`
11. 卸载
    1. 停止 docker `systemctl stop docker`
    2. 卸载 docker `$ sudo yum remove docker-ce`
    3. 删除 docker `$ sudo rm -rf /var/lib/docker`