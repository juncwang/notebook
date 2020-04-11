1. `docker search mysql` 
    + 搜索 mysql 镜像
2. `docker pull mysql` 
    + 拉取 mysql 镜像
3. `docker run -d -p 3306:3306 -v ~/dockerVolumes/mysql/config/mysqld.cnf:/etc/mysql/mysql.conf.d/mysqld.cnf -v ~/dockerVolumes/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD="root" mysql`
    * 可选参数
        * `--restart always` 开机启动
        * `--privileged=true` 提升容器内权限
        * `-v ~/dockerVolumes/mysql/config/mysqld.cnf:/etc/mysql/mysql.conf.d/mysqld.cnf` 映射配置文件
        * `-v ~/dockerVolumes/mysql/data:/var/lib/mysql` 映射数据目录
        * `-e MYSQL_USER="username"` 添加用户 username
        * `-e MYSQL_PASSWORLD="123456"` 设置 username 的密码 123456
        * `-e MYSQL_ROOT_PASSWORD="root"` 设置 root 的密码 root

4. `docker exec -it 容器名称 /bin/bash` 
    + 进入容器交互页面 并执行 mysql

* 如果出现 `docker: Error response from daemon: OCI runtime create failed: container_linux.go:345: starting container process caused "process_linux.go:430: container init caused` 错误
    * 原因是因为 - 创建时把 mysqld.cnf 创建成了文件夹而不是文件
    * 解决办法
        1. 查看刚才创建的容器是否存在 存在就先删除
        2. `docker run -d -e MYSQL_ROOT_PASSWORD="root" mysql:xx.xx.xx` 运行一个新的容器
        3. `docker cp 容器ID:mysqld.cnf路径 本机存放mysqld.cnf路径` 把容器内的配置文件拷贝出来放到应该放的位置
        4. 删除临时的新容器
        5. 重新创建 mysql 容器