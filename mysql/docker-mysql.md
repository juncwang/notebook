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