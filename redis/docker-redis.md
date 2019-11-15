1. `docker search redis` 
    + 搜索 redis 镜像
2. `docker pull redis` 
    + 拉取 redis 镜像
3. `docker run -p 6379:6379 -d redis:latest redis-server` 
    + run: 运行 -p 本机端口/容器端口 -d 后台运行 redis 镜像名称 redis-server 启动时执行的命令 
    + `docker run -p 6379:6379 -d -v $PWD/data:/data redis:latest redis-server --appendonly yes`
        + 增加项说明: -v 本机当前目录下的data/容器的data --appendonly 数据持久化
4. `docker exec -it 容器名称 redis-cli` 
    + 进入容器交互页面 并执行 redis-cli