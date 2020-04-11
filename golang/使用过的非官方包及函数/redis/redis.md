### 索引

+ `type Pool struct`
    + `func (p *Pool) Get() Conn`
    + `func (p *Pool) Close() error`

+ `type conn struct`
    + `func (c *conn) Do(cmd string, args ...interface{}) (interface{}, error)`
    + `func (c *conn) Close() error`

+ `func Dial(network, address string, options ...DialOption) (Conn, error)`
+ `func String(reply interface{}, err error) (string, error)`
+ `func Strings(reply interface{}, err error) ([]string, error)`
+ `func StringMap(result interface{}, err error) (map[string]string, error)`
+ `func Int(reply interface{}, err error) (int, error)`
+ `func Ints(reply interface{}, err error) ([]int, error)`
+ `func Int64(reply interface{}, err error) (int64, error)`
+ `func Int64s(reply interface{}, err error) ([]int64, error)`
+ `func IntMap(result interface{}, err error) (map[string]int, error)`
+ `func Int64Map(result interface{}, err error) (map[string]int64, error)`

### 说明

+ `type Pool struct`
    ```go
    type Pool struct{
        // Dial 是应用程序提高的创建并配置,链接功能
        Dial func() (Conn, error)
        // DialContext 是应用程序提高的创建并配置,与给定上下文链接功能
        DialContext func(ctx context.Context) (Conn, error)
        // TestOnBorrow 是可选性, 用于检测空闲链接健康状态, 然后链接再次使用
        TestOnBorrow func(c Conn, t time.Time) error
        // 最大空闲链接数
        MaxIdle int
        // 最活动大链接数, 0 表示没有限制
        MaxActive int
        // 最大空闲时间
        IdleTimeout time.Duration
        // 如果为 true MaxActive 处于限制状态, 则 Get() 时, 没有活动链接数时将等待其他活动链接数关闭
        Wait bool
        // 最大链接时间, 0 表示不限制
        MaxConnLifetime time.Duration
    }
    ```

    + `func (p *Pool) Get() Conn`
        + 从链接池获取一个链接
    + `func (p *Pool) Close() error`
        + 关闭链接池

+ `type conn struct`
    + conn 由 net.Conn 实现

    + `func (c *conn) Do(cmd string, args ...interface{}) (interface{}, error)`
        + 对远程 redis 数据库进行操作
    + `func (c *conn) Close() error`
        + 关闭链接

+ `func Dial(network, address string, options ...DialOption) (Conn, error)`
    + 拨号连接到给定网络上的Redis服务器，
    + 使用指定的选项寻址。
    + network - 链接方式:tcp
    + address - 网络地址:端口号
+ `func String(reply interface{}, err error) (string, error)`
    + 将 conn.Do 操作返回的值转为 string 类型
+ `func Strings(reply interface{}, err error) ([]string, error)`
    + 将 conn.Do 操作返回的值转为 []string 类型
+ `func StringMap(result interface{}, err error) (map[string]string, error)`
    + 将 conn.Do 操作返回的值转为 map[string]string 类型
+ `func Int(reply interface{}, err error) (int, error)`
    + 将 conn.Do 操作返回的值转为 int 类型
+ `func Ints(reply interface{}, err error) ([]int, error)`
    + 将 conn.Do 操作返回的值转为 []int 类型
+ `func Int64(reply interface{}, err error) (int64, error)`
    + 将 conn.Do 操作返回的值转为 int64 类型
+ `func Int64s(reply interface{}, err error) ([]int64, error)`
    + 将 conn.Do 操作返回的值转为 []int64 类型
+ `func IntMap(result interface{}, err error) (map[string]int, error)`
    + 将 conn.Do 操作返回的值转为 map[string]int 类型
+ `func Int64Map(result interface{}, err error) (map[string]int64, error)`
    + 将 conn.Do 操作返回的值转为 map[string]int64 类型