### golang 协程

+ 开启协程的方式
    + `go FuncName()`

### channel 管道

1. channel 本质就是一个数据结构 - 队列
2. 数据是先进先出
3. 线程安全, 多 goroutine 访问时, 不需要加锁, 就是说 channel 本身就是线程安全的
4. channel 有类型的, 一个 string 的 channel 只能存放 string 类型数据

+ channel 的创建及读取数据
```go
// 创建一个可以存放 3 个 int 类型的管道
// 管道 make 出来的数据长度是不会增长的, 超过长度就会报错
var intChan chan int
intChan = make(chan int, 3)
// 向管道写入数据
intChan<- 10
// 从管道取出数据, 每次取出一个数据后长度就会减一
// 如果没有协程的情况下, 取完后也会报错
num := <-intChan
```

+ channel 的关闭
```go
intChan := make(chan int, 3)
intChan<- 100
intChan<- 200
close(intChan)
// 这是不能够再写数据到 channel 内
// intChan<- 300 // 报错, channel 已经被关闭
// 当管道关闭后, 读取数据是可以的
n := <-intChan
```

+ channel 的遍历
```go
intChan := make(chan int, 100)
for i := 0; i < 100; i++ {
    intChan<- i*2
}
// 在遍历时, 如果 channel 没有关闭, 则会出现 deadlock 的错误
close(intChan)
// 遍历 channel 只能使用 for range
for v := range intChan {
    fmt.Println("v =", v)
}
```

+ channel 的线程保护
```go
// channel 线程保护
// 如果 channel 内没有值, 并且没有被关闭, 线程将被阻塞直到被关闭或读取到数据为止
_, ok := <-exitChan
// 判断 channel 是否关闭
if !ok {
    // 如果关闭, 执行代码
}
```
