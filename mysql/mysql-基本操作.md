### 数据导出导入

* 导出数据
    * `mysqldump -u root -proot 数据库名 表名 > 路径/文件名.sql` 导出数据库中的表
* 导入数据
    * 进入 mysql 的需要导入表的数据库 `use 数据库名`
    * `source /路径/文件名.sql`

### 设置远程连接数据库

1. 修改`/etc/mysql/mysql.conf.d/mysqld.cnf`文件
    * `[mysqld]`
    * `character-set-server=utf8` 修改数据库字符集
    * `bind-address = 127.0.0.1` 改成 `bind-address = 0.0.0.0`
    * `[client]`
    * `default-character-set=utf8` 修改字符集
2. 用 root 进入数据库对 mysql 数据库进行操作
    * `use mysql;` 切换到 mysql 数据库
    * `select User,authentication_string,Host from user;` 查看使用者及权限
3. 创建可以访问的用户及密码
    * `GRANT ALL PRIVILEGES ON *.* TO '你的账号'@'%' IDENTIFIED BY '访问密码';` 远程访问
    * `grant all on * to '你的账号' identified by '访问密码';` 全部访问权限
4. 刷新权限
    * `flush privileges;`
5. 重启数据库服务
    * `service mysql restart`