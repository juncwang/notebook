+ IMAGE 镜像模板:版本号(latest 表示最新版本-可省略)
+ CONTAINER_ID 容器id
+ OPTIONS 可选参数
+ COMMAND 启动执行命令
+ ARG... 传入参数
+ hostPort 本机端口
+ containerPort 容器端口
+ CONTAINER_PATH 容器目录文件
+ HOST_PATH 本机目录

### 帮助命令

##### docker version 
+ 查看 docker 版本

##### docker info
+ 查看 docker 的详细信息

##### docker --help
+ 查看 docker 的帮助信息


### 镜像命令

##### docker images [OPTIONS]
+ 查看本地有哪些镜像模板
    + OPTIONS
        + -a 列出本地所有的镜像
        + -q 只显示镜像 ID
        + --digests 显示镜像的摘要信息
        + --no-trunc 显示完整的镜像信息

##### docker search [OPTIONS] IMAGE
+ 在网络上查找是否有该镜像模板
    + OPTIONS
        + -s num 推荐指数在 num 以上的镜像模板
        + --no-trunc 显示完整的镜像信息
        + --automated 只列出 automated build 类型的镜像

##### docker pull IMAGE
+ 把网络上的镜像模板拉取到本地

##### docker rmi [OPTIONS] IMAGE
+ 删除本地的镜像模板
    + OPTIONS
        + -f 强制删除
            + 删除多个 -f 镜像名称1:版本号 镜像名称2:版本号 
            + 删除全部 -f $(docker images -qa)

##### docker commit [OPTIONS] CONTAINER_ID 需要创建的目标镜像名:[标签名]
+ 提交容器副本使之成为一个新的镜像
    + OPTIONS
        + -m "提交的描述信息" 
        + -a "作者"

##### docker build [OPTIONS] .
+ 使用 DockerFile 文件生成镜像文件, 最后添加一个点 代表在当前路径下查找
    + OPTIONS
        + -f /DockerfilePath 指定 DockerFile 位置
        + -t imageName 指定生成后的镜像文件名称
        + --privileged=true 添加权限

##### docker history IMAGE_ID
+ 列镜像创建的历史

### 容器命令

##### docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
+ 运行 docker 镜像模板(先查看本地是否有该镜像文件, 如果没有再在网络上查找并下载)
    + OPTIONS
        + -d 后台运行容器, 并返回容器 ID, 也即启动守护式容器
        + -v HOST_PATH:CONTAINER_PATH[:OPTIONS] 把本地文件目录与容器文件目录共享
            + OPTIONS
                + ro 只读不可写
            * window 下 路径用 `/d/` 表示 D 盘根目录
        + -i 以交互模式运行容器, 通常与 -t 同时使用
        + -t 为容器重新分配一个伪输入终端, 通常与 -i 同时使用
            + 退出容器
                + exit 容器停止退出
                + ctrl+p+q 容器不停止退出
        + -P 随机端口映射
        + -p 指定端口映射, 有以下四种格式
            + ip:hostPort:containerPort
            + ip::containerPort
            + hostPort:containerPort (常用)
            + containerPort
        + -e MYSQL_ROOT_PASSWORD=123456 初始化 root 用户的密码 ( mysql )
        + --name strName 为创建的容器命名为 strName, 不命名系统会随机生成一个名字
        + --volumes-from CONTAINER_ID 挂载数据继承自 CONTAINER_ID
        
    + COMMAND
        + `ls /` 使用 linux 命令
        + `/bin/bash` 进入容器默认文件路径
        + `/bin/sh -c "需要执行的脚步语言"` 启动后执行脚本

##### docker ps [OPTIONS] 
+ 查看当前正在运行的容器
    + OPTIONS
        + -a 列出当前所有正在运行的容器及历史上运行过的容器
        + -l 显示最近创建的容器
        + -n 显示最近 num 个创建的容器
        + -q 只显示容器编号
        + --no-trunc 显示完整的镜像信息

##### docker start CONTAINER_ID
+ 启动 docker 已经关闭的容器

##### docker restart CONTAINER_ID
+ 重启 docker 容器

##### docker stop CONTAINER_ID
+ 停止 docker 容器

##### docker kill CONTAINER_ID
+ 直接关闭 docker 容器进程

##### docker rm [OPTIONS] CONTAINER_ID
+ 删除 docker 运行并保持的容器
    + OPTIONS
        + -f 强制删除
            + 删除全部 -f $(docker ps -q -a)

##### docker logs [OPTIONS] CONTAINER_ID
+ 查看容器日志
    + OPTIONS
        + -t 时间戳
        + -f 跟随最新的日志打印
        + --tail num 显示最后多少条

##### docker top CONTAINER_ID
+ 查看容器当前运行的进程

##### docker inspect CONTAINER_ID
+ 查看容器内部细节
+ 内容有默认的挂载硬盘位置 Volume , 如果 DockerFile 有挂载

##### docker exec [OPTIONS] CONTAINER_ID [COMMAND] [ARG...]
+ 进入正在运行的容器并以命令行进行交互
+ 在容器中打开新的终端, 并且可以启动新的进程
    + OPTIONS COMMAND ARG...
        + 与 `docker run` 基本一致
            + `dcoker exec CONTAINER_ID sh -c 'exec mysqldump --all-databases -uroot -p"123456"' > /HOST_PATH/all-databases.sql`
            - 把运行中的 mysql 数据中的数据导出到本机上

##### docker attach CONTAINER_ID
+ 进入正在运行的容器并以命令行进行交互
+ 直接进入容器启动命令的终端, 不会启动新的进程

##### docker cp CONTAINER_ID:CONTAINER_PATH HOST_PATH
+ 将容器内的文件拷贝到本地
+ * window 下 本地存放路径默认为 当前所在磁盘 前面不需要加 `/d/`