### http

* 引入 `const http = require('http')`

* 参数
    * `options <Object>`
        * `IncomingMessage <http.IncomingMessage>` 指定要使用的 IncomingMessage 类。用于扩展原始的 IncomingMessage 默认值: IncomingMessage
        * `ServerResponse <http.ServerResponse>` 指定要使用的 ServerResponse 类。用于扩展原始的 ServerResponse 默认值: ServerResponse
        * `insecureHTTPParser <boolean>` 使用不安全的 HTTP 解析器，当为 true 时接受无效的 HTTP 请求头 应避免使用不安全的解析器。有关更多信息，参见 --insecure-http-parser 默认值: false。
        * `maxHeaderSize <number>` 可选地，重写此服务器接收的请求的 --max-http-header-size 值，即请求头的最大长度（以字节为单位） 默认值: 16384（16KB）
    * `requestListener <Function>`
        * `request <http.Request>` 接收请求
        * `response <http.Response>` 响应请求

* 方法
    * http.createServer([options][, requestListener]) 创建 http 服务器
        * `返回: <http.Server>`

* http.Server 参数方法
    * http.Server.listen([port[, host[, backlog]]][, callback])
        * `port <number>` 端口号
        * `host <string>` 主机
        * `backlog <number>` server.listen() 函数的通用参数。
        * `callback <Function>` 回调函数

* http.Request 参数方法
    * `request.url` 客户端发送的链接路径

* http.Response 参数方法
    * `response.write(chunk[, encoding][, callback])` 写入需要发送给客户端的数据
        * `chunk <string> | <Buffer>` 数据
        * `encoding <string>`编码 utf8
        * `callback <Function>`回调函数
    * `response.writeHead(statusCode[, statusMessage][, headers])` 写入发送给客户端的头数据
        * `statusCode <number>` 状态码
        * `statusMessage <string>` 头部信息
        * `headers <Object>` 头部信息 `Content-Type : [text/html, application/json, ...]`
    * `response.end([data[, encoding]][, callback])` 完成并返回给客户端
        * `data <string> | <Buffer>` 数据
        * `encoding <string>` 编码 utf8
        * `callback <Function>` 回调函数