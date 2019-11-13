### golang 协程

+ 开启协程的方式
    + `go FuncName()`

### channel 管道

1. channel 本质就是一个数据结构 - 队列
2. 数据是先进先出
3. 线程安全, 多 goroutine 访问时, 不需要加锁, 就是说 channel 本身就是线程安全的
4. channel 有类型的, 一个 string 的 channel 只能存放 string 类型数据

+ 如何使用 channel 
    + 创建一个可以存放 3 个 int 类型的管道
    + 管道 make 出来的数据长度是不会增长的, 超过长度就会报错
    + `var intChan chan int`
    + `intChan = make(chan int, 3) `
    + 向管道写入数据
    + `intChan<- 10` 
    + 从管道去除数据, 每次取出一个数据后长度就会减一
    + 如果没有协程的情况下, 取完后也会报错
    + `num := <-intChan`