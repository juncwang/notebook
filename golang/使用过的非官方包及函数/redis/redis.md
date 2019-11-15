### 索引

+ `type conn struct`
    + `func (c *conn) Do(cmd string, args ...interface{}) (interface{}, error)`

+ `func Dial(network, address string, options ...DialOption) (Conn, error)`
+ `func String(reply interface{}, err error) (string, error)`
+ `func Strings(reply interface{}, err error) ([]string, error)`

### 说明

+ `type conn struct`
    + conn 由 net.Conn 实现

    + `func (c *conn) Do(cmd string, args ...interface{}) (interface{}, error)`
        + 对远程 redis 数据库进行操作

+ `func Dial(network, address string, options ...DialOption) (Conn, error)`
    + 拨号连接到给定网络上的Redis服务器，
    + 使用指定的选项寻址。
    + network - 链接方式:tcp
    + address - 网络地址:端口号
+ `func String(reply interface{}, err error) (string, error)`
    + 将 conn.Do 操作返回的值转为 string 类型
+ `func Strings(reply interface{}, err error) ([]string, error)`
    + 将 conn.Do 操作返回的值转为 []string 类型