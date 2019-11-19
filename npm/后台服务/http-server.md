### http-server

* 安装方式
    * `npm install http-server -g`

* 直接使用方法
    + 在 html 项目路径下
    * `$ http-server [option]`
        + -p:使用的端口（默认的是8080）
        + -a 要使用的地址（默认为0.0.0.0）
        + -d 显示目录列表（默认为“True”）
        + -i 显示autoIndex（默认为“True”）
        + -g或--gzip启用时（默认为“False”），它将用于./public/some-file.js.gz代替./public/some-file.jsgzip压缩版本的文件，并且该请求接受gzip编码
        + -e或--ext默认文件扩展名（如果没有提供）（默认为'html'）
        + -s或--silent从输出中抑制日志消息:这个意思就是你输入之后，日志消息不会显示
        + -o 启动服务器后打开浏览器窗口:这个的话就好了 直接在文件夹下shuru http-server -o回车之后就会自动跳转到浏览器了
        + -S或--ssl启用https:我个人觉得这个很好哎 可是不知道为什么我的会报错，你们知道的就来知会一声咯
        + -C或--certssl证书文件的路径（默认值：cert.pem）。
        + -K或--keyssl密钥文件的路径（默认值：key.pem）。
        + -r或者--robots提供一个/robots.txt（其内容默认为'User-agent：* \ nDisallow：/'）
        + -h或--help打印此列表并退出。
        + -c设置缓存控制max-age头的缓存时间（以秒为单位），例如-c10 10秒（默认为'3600'）。要禁用缓存，请使用-c-1。
        + -U或--utc在日志消息中使用UTC时间格式
        + -c设置缓存控制max-age头的缓存时间（以秒为单位），例如-c10 10秒（默认为'3600'）。要禁用缓存，请使用-c-1。
        + -U或--utc在日志消息中使用UTC时间格式