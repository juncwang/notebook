### 概述

+ url包解析URL并实现了查询的逸码，参见RFC 3986。

### 索引

+ `type URL struct`

### 说明

+ `type URL struct`
    + URL类型代表一个解析后的URL（或者说，一个URL参照）。URL基本格式如下：`scheme://[userinfo@]host/path[?query][#fragment]`
    + scheme后不是冒号加双斜线的URL被解释为如下格式：`scheme:opaque[?query][#fragment]`
    + 注意路径字段是以解码后的格式保存的，如/%47%6f%2f会变成/Go/。这导致我们无法确定Path字段中的斜线是来自原始URL还是解码前的%2f。除非一个客户端必须使用其他程序/函数来解析原始URL或者重构原始URL，这个区别并不重要。此时，HTTP服务端可以查询req.RequestURI，而HTTP客户端可以使用URL{Host: "example.com", Opaque: "//example.com/Go%2f"}代替{Host: "example.com", Path: "/Go/"}。
    + 代码:
    ```go
    type URL struct {
        Scheme   string
        Opaque   string    // 编码后的不透明数据
        User     *Userinfo // 用户名和密码信息
        Host     string    // host或host:port
        Path     string
        RawQuery string // 编码后的查询字符串，没有'?'
        Fragment string // 引用的片段（文档位置），没有'#'
    }
    ```