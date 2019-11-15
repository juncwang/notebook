### 概述
+ net包提供了可移植的网络I/O接口，包括TCP/IP、UDP、域名解析和Unix域socket。
+ 虽然本包提供了对网络原语的访问，大部分使用者只需要Dial、Listen和Accept函数提供的基本接口；以及相关的Conn和Listener接口。crypto/tls包提供了相同的接口和类似的Dial和Listen函数。
+ Dial函数和服务端建立连接：
```go
conn, err := net.Dial("tcp", "google.com:80")
if err != nil {
	// handle error
}
fmt.Fprintf(conn, "GET / HTTP/1.0\r\n\r\n")
status, err := bufio.NewReader(conn).ReadString('\n')
```
+ Listen函数创建的服务端：
```go
ln, err := net.Listen("tcp", ":8080")
if err != nil {
	// handle error
}
for {
	conn, err := ln.Accept()
	if err != nil {
		// handle error
		continue
	}
	go handleConnection(conn)
}
```

### 索引

+ `type Error interface`

+ `type Listener interface`
    + `func Listen(net, laddr string) (Listener, error)`

+ `type Addr interface`
+ `type Conn interface`
    + `func Dial(network, address string) (Conn, error)`

### 说明

+ `type Error interface`
    + Error代表一个网络错误
    ```go
    type Error interface {
        error
        Timeout() bool   // 错误是否为超时？
        Temporary() bool // 错误是否是临时的？
    }
    ```

+ `type Listener interface`
    + Listener是一个用于面向流的网络协议的公用的网络监听器接口。多个线程可能会同时调用一个Listener的方法。
    ```go
    type Listener interface {
        // Addr返回该接口的网络地址
        Addr() Addr
        // Accept等待并返回下一个连接到该接口的连接
        Accept() (c Conn, err error)
        // Close关闭该接口，并使任何阻塞的Accept操作都会不再阻塞并返回错误。
        Close() error
    }
    ```

    + `func Listen(net, laddr string) (Listener, error)`
        + 返回在一个本地网络地址laddr上监听的Listener。网络类型参数net必须是面向流的网络：
        + "tcp"、"tcp4"、"tcp6"、"unix"或"unixpacket"。参见Dial函数获取laddr的语法

+ `type Addr interface`
    + Addr代表一个网络终端地址
    ```go
    type Addr interface {
        Network() string // 网络名
        String() string  // 字符串格式的地址
    }
    ```

+ `type Conn interface`
    + Conn接口代表通用的面向流的网络连接。多个线程可能会同时调用同一个Conn的方法。
    ```go
    type Conn interface {
        // Read从连接中读取数据
        // Read方法可能会在超过某个固定时间限制后超时返回错误，该错误的Timeout()方法返回真
        Read(b []byte) (n int, err error)
        // Write从连接中写入数据
        // Write方法可能会在超过某个固定时间限制后超时返回错误，该错误的Timeout()方法返回真
        Write(b []byte) (n int, err error)
        // Close方法关闭该连接
        // 并会导致任何阻塞中的Read或Write方法不再阻塞并返回错误
        Close() error
        // 返回本地网络地址
        LocalAddr() Addr
        // 返回远端网络地址
        RemoteAddr() Addr
        // 设定该连接的读写deadline，等价于同时调用SetReadDeadline和SetWriteDeadline
        // deadline是一个绝对时间，超过该时间后I/O操作就会直接因超时失败返回而不会阻塞
        // deadline对之后的所有I/O操作都起效，而不仅仅是下一次的读或写操作
        // 参数t为零值表示不设置期限
        SetDeadline(t time.Time) error
        // 设定该连接的读操作deadline，参数t为零值表示不设置期限
        SetReadDeadline(t time.Time) error
        // 设定该连接的写操作deadline，参数t为零值表示不设置期限
        // 即使写入超时，返回值n也可能>0，说明成功写入了部分数据
        SetWriteDeadline(t time.Time) error
    }
    ```

    + `func Dial(network, address string) (Conn, error)`
        + 在网络network上连接地址address，并返回一个Conn接口。可用的网络类型有：
        + "tcp"、"tcp4"、"tcp6"、"udp"、"udp4"、"udp6"、"ip"、"ip4"、"ip6"、"unix"、"unixgram"、"unixpacket"
        + 对TCP和UDP网络，地址格式是host:port或[host]:port，参见函数JoinHostPort和SplitHostPort
        ```go
        Dial("tcp", "12.34.56.78:80")
        Dial("tcp", "google.com:http")
        Dial("tcp", "[2001:db8::1]:http")
        Dial("tcp", "[fe80::1%lo0]:80")
        ```
        + 对IP网络，network必须是"ip"、"ip4"、"ip6"后跟冒号和协议号或者协议名，地址必须是IP地址字面值
        ```go
        Dial("ip4:1", "127.0.0.1")
        Dial("ip6:ospf", "::1")
        ```
        + 对Unix网络，地址必须是文件系统路径