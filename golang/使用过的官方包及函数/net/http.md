### 概述
+ http包提供了HTTP客户端和服务端的实现。
+ Get、Head、Post和PostForm函数发出HTTP/ HTTPS请求。

### 索引

+ `type Handler interface`
+ `type ResponseWriter interface`

+ `type Request struct`

+ `type Header map[string][]string`
    + `func (h Header) Get(key string) string`
    + `func (h Header) Set(key, value string)`
    + `func (h Header) Add(key, value string)`
    + `func (h Header) Del(key string)`
    + `func (h Header) Write(w io.Writer) error`
    + `func (h Header) WriteSubset(w io.Writer, exclude map[string]bool) error`

+ `type Server struct`
    + `func (srv *Server) ListenAndServe() error`
    + `func (srv *Server) ListenAndServeTLS(certFile, keyFile string) error`
+ `type ServeMux struct`
    + `func NewServeMux() *ServeMux`
    + `func (mux *ServeMux) Handle(pattern string, handler Handler)`
    + `func (mux *ServeMux) HandleFunc(pattern string, handler func(ResponseWriter, *Request))`

+ `func Handle(pattern string, handler Handler)`
+ `func HandleFunc(pattern string, handler func(ResponseWriter, *Request))`
+ `func ListenAndServe(addr string, handler Handler) error`
+ `func ListenAndServeTLS(addr string, certFile string, keyFile string, handler Handler) error`

### 说明

+ `type Handler interface`
    + 实现了Handler接口的对象可以注册到HTTP服务端，为特定的路径及其子树提供服务。
    + ServeHTTP应该将回复的头域和数据写入ResponseWriter接口然后返回。返回标志着该请求已经结束，HTTP服务端可以转移向该连接上的下一个请求
    + 代码: 
    ```go
    type Handler interface {
        ServeHTTP(ResponseWriter, *Request)
    }
    ```
+ `type ResponseWriter interface`
    + ResponseWriter接口被HTTP处理器用于构造HTTP回复。
    + 代码:
    ```go
    type ResponseWriter interface {
        // Header返回一个Header类型值，该值会被WriteHeader方法发送。
        // 在调用WriteHeader或Write方法后再改变该对象是没有意义的。
        Header() Header
        // WriteHeader该方法发送HTTP回复的头域和状态码。
        // 如果没有被显式调用，第一次调用Write时会触发隐式调用WriteHeader(http.StatusOK)
        // WriterHeader的显式调用主要用于发送错误码。
        WriteHeader(int)
        // Write向连接中写入作为HTTP的一部分回复的数据。
        // 如果被调用时还未调用WriteHeader，本方法会先调用WriteHeader(http.StatusOK)
        // 如果Header中没有"Content-Type"键，
        // 本方法会使用包函数DetectContentType检查数据的前512字节，将返回值作为该键的值。
        Write([]byte) (int, error)
    }
    ```

+ `type Request struct`
    + Request类型代表一个服务端接受到的或者客户端发送出去的HTTP请求。
    + Request各字段的意义和用途在服务端和客户端是不同的。除了字段本身上方文档，还可参见Request.Write方法和RoundTripper接口的文档。
    + 代码:
    ```go
    type Request struct {
        // Method指定HTTP方法（GET、POST、PUT等）。对客户端，""代表GET。
        Method string
        // URL在服务端表示被请求的URI，在客户端表示要访问的URL。
        //
        // 在服务端，URL字段是解析请求行的URI（保存在RequestURI字段）得到的，
        // 对大多数请求来说，除了Path和RawQuery之外的字段都是空字符串。
        // （参见RFC 2616, Section 5.1.2）
        //
        // 在客户端，URL的Host字段指定了要连接的服务器，
        // 而Request的Host字段（可选地）指定要发送的HTTP请求的Host头的值。
        URL *url.URL
        // 接收到的请求的协议版本。本包生产的Request总是使用HTTP/1.1
        Proto      string // "HTTP/1.0"
        ProtoMajor int    // 1
        ProtoMinor int    // 0
        // Header字段用来表示HTTP请求的头域。如果头域（多行键值对格式）为：
        //	accept-encoding: gzip, deflate
        //	Accept-Language: en-us
        //	Connection: keep-alive
        // 则：
        //	Header = map[string][]string{
        //		"Accept-Encoding": {"gzip, deflate"},
        //		"Accept-Language": {"en-us"},
        //		"Connection": {"keep-alive"},
        //	}
        // HTTP规定头域的键名（头名）是大小写敏感的，请求的解析器通过规范化头域的键名来实现这点。
        // 在客户端的请求，可能会被自动添加或重写Header中的特定的头，参见Request.Write方法。
        Header Header
        // Body是请求的主体。
        //
        // 在客户端，如果Body是nil表示该请求没有主体买入GET请求。
        // Client的Transport字段会负责调用Body的Close方法。
        //
        // 在服务端，Body字段总是非nil的；但在没有主体时，读取Body会立刻返回EOF。
        // Server会关闭请求的主体，ServeHTTP处理器不需要关闭Body字段。
        Body io.ReadCloser
        // ContentLength记录相关内容的长度。
        // 如果为-1，表示长度未知，如果>=0，表示可以从Body字段读取ContentLength字节数据。
        // 在客户端，如果Body非nil而该字段为0，表示不知道Body的长度。
        ContentLength int64
        // TransferEncoding按从最外到最里的顺序列出传输编码，空切片表示"identity"编码。
        // 本字段一般会被忽略。当发送或接受请求时，会自动添加或移除"chunked"传输编码。
        TransferEncoding []string
        // Close在服务端指定是否在回复请求后关闭连接，在客户端指定是否在发送请求后关闭连接。
        Close bool
        // 在服务端，Host指定URL会在其上寻找资源的主机。
        // 根据RFC 2616，该值可以是Host头的值，或者URL自身提供的主机名。
        // Host的格式可以是"host:port"。
        //
        // 在客户端，请求的Host字段（可选地）用来重写请求的Host头。
        // 如过该字段为""，Request.Write方法会使用URL字段的Host。
        Host string
        // Form是解析好的表单数据，包括URL字段的query参数和POST或PUT的表单数据。
        // 本字段只有在调用ParseForm后才有效。在客户端，会忽略请求中的本字段而使用Body替代。
        Form url.Values
        // PostForm是解析好的POST或PUT的表单数据。
        // 本字段只有在调用ParseForm后才有效。在客户端，会忽略请求中的本字段而使用Body替代。
        PostForm url.Values
        // MultipartForm是解析好的多部件表单，包括上传的文件。
        // 本字段只有在调用ParseMultipartForm后才有效。
        // 在客户端，会忽略请求中的本字段而使用Body替代。
        MultipartForm *multipart.Form
        // Trailer指定了会在请求主体之后发送的额外的头域。
        //
        // 在服务端，Trailer字段必须初始化为只有trailer键，所有键都对应nil值。
        // （客户端会声明哪些trailer会发送）
        // 在处理器从Body读取时，不能使用本字段。
        // 在从Body的读取返回EOF后，Trailer字段会被更新完毕并包含非nil的值。
        // （如果客户端发送了这些键值对），此时才可以访问本字段。
        //
        // 在客户端，Trail必须初始化为一个包含将要发送的键值对的映射。（值可以是nil或其终值）
        // ContentLength字段必须是0或-1，以启用"chunked"传输编码发送请求。
        // 在开始发送请求后，Trailer可以在读取请求主体期间被修改，
        // 一旦请求主体返回EOF，调用者就不可再修改Trailer。
        //
        // 很少有HTTP客户端、服务端或代理支持HTTP trailer。
        Trailer Header
        // RemoteAddr允许HTTP服务器和其他软件记录该请求的来源地址，一般用于日志。
        // 本字段不是ReadRequest函数填写的，也没有定义格式。
        // 本包的HTTP服务器会在调用处理器之前设置RemoteAddr为"IP:port"格式的地址。
        // 客户端会忽略请求中的RemoteAddr字段。
        RemoteAddr string
        // RequestURI是被客户端发送到服务端的请求的请求行中未修改的请求URI
        // （参见RFC 2616, Section 5.1）
        // 一般应使用URI字段，在客户端设置请求的本字段会导致错误。
        RequestURI string
        // TLS字段允许HTTP服务器和其他软件记录接收到该请求的TLS连接的信息
        // 本字段不是ReadRequest函数填写的。
        // 对启用了TLS的连接，本包的HTTP服务器会在调用处理器之前设置TLS字段，否则将设TLS为nil。
        // 客户端会忽略请求中的TLS字段。
        TLS *tls.ConnectionState
    }
    ```

+ `type Header map[string][]string`
    + Header代表HTTP头域的键值对。
    + `func (h Header) Get(key string) string`
        + Get返回键对应的第一个值，如果键不存在会返回""。如要获取该键对应的值切片，请直接用规范格式的键访问map。
    + `func (h Header) Set(key, value string)`
        + Set添加键值对到h，如键已存在则会用只有新值一个元素的切片取代旧值切片。
    + `func (h Header) Add(key, value string)`
        + Add添加键值对到h，如键已存在则会将新的值附加到旧值切片后面。
    + `func (h Header) Del(key string)`
        + Del删除键值对。
    + `func (h Header) Write(w io.Writer) error`
        + Write以有线格式将头域写入w。
    + `func (h Header) WriteSubset(w io.Writer, exclude map[string]bool) error`
        + WriteSubset以有线格式将头域写入w。当exclude不为nil时，如果h的键值对的键在exclude中存在且其对应值为真，该键值对就不会被写入w。

+ `type Server struct`
    + Server类型定义了运行HTTP服务端的参数。Server的零值是合法的配置。
    + 代码:
    ```go
    type Server struct {
        Addr           string        // 监听的TCP地址，如果为空字符串会使用":http"
        Handler        Handler       // 调用的处理器，如为nil会调用http.DefaultServeMux
        ReadTimeout    time.Duration // 请求的读取操作在超时前的最大持续时间
        WriteTimeout   time.Duration // 回复的写入操作在超时前的最大持续时间
        MaxHeaderBytes int           // 请求的头域最大长度，如为0则用DefaultMaxHeaderBytes
        TLSConfig      *tls.Config   // 可选的TLS配置，用于ListenAndServeTLS方法
        // TLSNextProto（可选地）指定一个函数来在一个NPN型协议升级出现时接管TLS连接的所有权。
        // 映射的键为商谈的协议名；映射的值为函数，该函数的Handler参数应处理HTTP请求，
        // 并且初始化Handler.ServeHTTP的*Request参数的TLS和RemoteAddr字段（如果未设置）。
        // 连接在函数返回时会自动关闭。
        TLSNextProto map[string]func(*Server, *tls.Conn, Handler)
        // ConnState字段指定一个可选的回调函数，该函数会在一个与客户端的连接改变状态时被调用。
        // 参见ConnState类型和相关常数获取细节。
        ConnState func(net.Conn, ConnState)
        // ErrorLog指定一个可选的日志记录器，用于记录接收连接时的错误和处理器不正常的行为。
        // 如果本字段为nil，日志会通过log包的标准日志记录器写入os.Stderr。
        ErrorLog *log.Logger
        // 内含隐藏或非导出字段
    }
    ```
    + `func (srv *Server) ListenAndServe() error`
        + ListenAndServe监听srv.Addr指定的TCP地址，并且会调用Serve方法接收到的连接。如果srv.Addr为空字符串，会使用":http"。
    + `func (srv *Server) ListenAndServeTLS(certFile, keyFile string) error`
        + ListenAndServeTLS监听srv.Addr确定的TCP地址，并且会调用Serve方法处理接收到的连接。必须提供证书文件和对应的私钥文件。如果证书是由权威机构签发的，certFile参数必须是顺序串联的服务端证书和CA证书。如果srv.Addr为空字符串，会使用":https"。
+ `type ServeMux struct`
    + ServeMux类型是HTTP请求的多路转接器。它会将每一个接收的请求的URL与一个注册模式的列表进行匹配，并调用和URL最匹配的模式的处理器。
    + 模式是固定的、由根开始的路径，如"/favicon.ico"，或由根开始的子树，如"/images/"（注意结尾的斜杠）。较长的模式优先于较短的模式，因此如果模式"/images/"和"/images/thumbnails/"都注册了处理器，后一个处理器会用于路径以"/images/thumbnails/"开始的请求，前一个处理器会接收到其余的路径在"/images/"子树下的请求。
    + 注意，因为以斜杠结尾的模式代表一个由根开始的子树，模式"/"会匹配所有的未被其他注册的模式匹配的路径，而不仅仅是路径"/"。
    + 模式也能（可选地）以主机名开始，表示只匹配该主机上的路径。指定主机的模式优先于一般的模式，因此一个注册了两个模式"/codesearch"和"codesearch.google.com/"的处理器不会接管目标为"http://www.google.com/"的请求。
    + ServeMux还会注意到请求的URL路径的无害化，将任何路径中包含"."或".."元素的请求重定向到等价的没有这两种元素的URL。（参见path.Clean函数）
    + 代码:
    ```go
    type ServeMux struct {
        // 内含隐藏或非导出字段
    }
    ```
    + `func NewServeMux() *ServeMux`
        + NewServeMux创建并返回一个新的*ServeMux
    + `func (mux *ServeMux) Handle(pattern string, handler Handler)`
        + Handle注册HTTP处理器handler和对应的模式pattern。如果该模式已经注册有一个处理器，Handle会panic。
    + `func (mux *ServeMux) HandleFunc(pattern string, handler func(ResponseWriter, *Request))`
        + HandleFunc注册一个处理器函数handler和对应的模式pattern。


+ `func Handle(pattern string, handler Handler)`
    + Handle注册HTTP处理器handler和对应的模式pattern（注册到DefaultServeMux）。如果该模式已经注册有一个处理器，Handle会panic。ServeMux的文档解释了模式的匹配机制。
+ `func HandleFunc(pattern string, handler func(ResponseWriter, *Request))`
    + HandleFunc注册一个处理器函数handler和对应的模式pattern（注册到DefaultServeMux）。ServeMux的文档解释了模式的匹配机制
+ `func ListenAndServe(addr string, handler Handler) error`
    + ListenAndServe监听TCP地址addr，并且会使用handler参数调用Serve函数处理接收到的连接。handler参数一般会设为nil，此时会使用DefaultServeMux。
    + 例子:
    ```go
    package main
    import (
        "io"
        "net/http"
        "log"
    )
    // hello world, the web server
    func HelloServer(w http.ResponseWriter, req *http.Request) {
        io.WriteString(w, "hello, world!\n")
    }
    func main() {
        http.HandleFunc("/hello", HelloServer)
        err := http.ListenAndServe(":12345", nil)
        if err != nil {
            log.Fatal("ListenAndServe: ", err)
        }
    }
    ```
+ `func ListenAndServeTLS(addr string, certFile string, keyFile string, handler Handler) error`
    + ListenAndServeTLS函数和ListenAndServe函数的行为基本一致，除了它期望HTTPS连接之外。此外，必须提供证书文件和对应的私钥文件。如果证书是由权威机构签发的，certFile参数必须是顺序串联的服务端证书和CA证书。如果srv.Addr为空字符串，会使用":https"。
    + 例子:
    ```go
    import (
        "log"
        "net/http"
    )
    func handler(w http.ResponseWriter, req *http.Request) {
        w.Header().Set("Content-Type", "text/plain")
        w.Write([]byte("This is an example server.\n"))
    }
    func main() {
        http.HandleFunc("/", handler)
        log.Printf("About to listen on 10443. Go to https://127.0.0.1:10443/")
        err := http.ListenAndServeTLS(":10443", "cert.pem", "key.pem", nil)
        if err != nil {
            log.Fatal(err)
        }
    }
    ```