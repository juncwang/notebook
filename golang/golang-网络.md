### 服务器与客户端试例
+ server
```go
func porcess(conn net.Conn)  {
	// 这里循环接受客户发送的数据
	defer conn.Close()	// 关闭 conn
	for {
		fmt.Println("wait client write, client ip :", conn.RemoteAddr())
		// 创建一个新的切片
		buf := make([]byte, 1024)
		// 等待客户端通过 conn.Write 发送数据
		// 如果没有接收到, 协程将阻塞在这里
		n, err := conn.Read(buf) // 从 conn 读取
		if err != nil {
			fmt.Println("conn.Read err :", err)
			return
		}
		// 显示客户端发送的内容到服务器端
		fmt.Printf("content is : %v\nsize is :%v\n",string(buf[:n-1]), n)
	}
}
func main()  {
	fmt.Println("服务器开始监听 ... ...")
	// tcp 表示使用网络协议是 tcp
	// 0.0.0.0:8888 表示在本地监听 8888端口
	listen, err := net.Listen("tcp", "0.0.0.0:8888")
	if err != nil {
		fmt.Println("net.Listen err :", err)
		return
	}
	defer listen.Close() // 延时关闭 listen
	for {
		fmt.Println("等待客户端连接 ... ...")
		conn, err := listen.Accept()
		if err != nil {
			fmt.Println("listen.Accept err :", err)
		} 
		go porcess(conn)
	}
}
```
+ client
```go
func stdinStr(conn net.Conn, exitChan chan bool){
	// 客户端发送单行数据到客户端
	reader := bufio.NewReader(os.Stdin)
	for {
		// 从终端读取一行用户的输入
		line, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("reader.ReadString err :", err)
		}
		// 如果用户输入的是 exit 就退出
		str := strings.Trim(line, " \r\n")
		if str == "exit" {
			close(exitChan)
			break
		}
		// 将输入 发送到服务器
		n, err := conn.Write([]byte(line))
		if err != nil {
			fmt.Println("conn.Write err :", err)
		}
		fmt.Println("send []byte :", n)
	}
}
func main()  {
	exitChan := make(chan bool, 0)
	// 创建一个拨号
	conn, err := net.Dial("tcp", "0.0.0.0:8888")
	if err != nil {
		fmt.Println("net.Dial err :", err)
		return
	}
	go stdinStr(conn, exitChan)
	<-exitChan
}
```