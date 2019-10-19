### type-switch 判断某个 interface 变量中的实际执行的变量类型

```go
var x interface{}
var y = 10.0
x = y
switch i := x.(type) {  // 这里 i 获得 x 接口目前的类型
    case nil:
        fmt.Printf("x 的类型为 nil")
    case int:
        fmt.Printf("x 的类型为 int")
    case ...:
        ...
    default:
        fmt.Printf("未知类型")
}
```