1. `docker search nginx` 
    + 搜索 nginx 镜像
2. `docker pull nginx` 
    + 拉取 nginx 镜像
3. `docker run -p 80:80 -d nginx:latest` 
    + run: 运行 -p 本机端口:容器端口 -d 后台运行 nginx 镜像名称 
    + `docker run -p 80:80 -d -v $PWD/html:/usr/share/nginx/html -v $PWD/nginx/nginx.conf:/etc/nginx/nginx.conf nginx`
        +  window 下 路径用 `/d/` 表示 D 盘根目录
4. `docker exec -it nginx容器名称` 
    + 进入容器交互页面
5. `curl 127.0.0.1:80`
    + 检查是否开启成功