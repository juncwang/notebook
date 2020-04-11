```go
import(
	"module/redigo/redis"
)

func main()  {
	// 链接到 redis 数据库
	conn, err := redis.Dial("tcp", "40.73.79.13:9999")
	if err != nil {
		fmt.Println("redis.Dial err :", err)
		return
	}
	defer conn.Close()

	// 通过 go 向 redis 写入数据 string [key-val]
	_, err = conn.Do("set", "name", "tomjerry 非灰")
	if err != nil {
		fmt.Println("conn.Do set err :", err)
		return
	}
	
	// 通过 go 向 redis 读取数据 string [key-val]
	r, err := redis.String(conn.Do("get", "name"))
	if err != nil {
		fmt.Println("conn.Do get err :", err)
	}
	fmt.Println("conn.Do get name :", r)

	// hash 操作演示
	// _, err = conn.Do("hset", "user1", "name", "贪慕")
	// r, err = redis.String(conn.Do("hget", "user1", "name"))
}
```

+ pool

```go
var pool *redis.Pool 

func init()  {
    // 创建一个链接池, 并配置参数
	pool = &redis.Pool{
		MaxIdle: 8, // 最大空闲链接数
		MaxActive: 0, // 最大链接数, 0 表示没有限制
		IdleTimeout: 100, // 最大空闲时间
		Dial: func () (redis.Conn, error)  { // 初始化链接代码
			return redis.Dial("tcp", "40.73.79.13:9999")
		},
	}
}

func main()  {
    // 从链接池获取一个链接
	conn := pool.Get()
	defer conn.Close()

	_, err := conn.Do("set", "main", "hello world")
	if err != nil {
		fmt.Println("conn.Do set err :", err)
	}

	r, err := redis.String(conn.Do("get", "main"))
	if err != nil {
		fmt.Println("conn.Do get err :", err)
	}
	fmt.Println("redis get main value is :", r)
}
```