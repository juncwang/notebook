### type-switch 判断某个 interface 变量中的实际执行的变量类型

```go
// 单个类型断言
var x interface{}
var y = 10.0
x = y

if v, ok := x.(float64); ok {
    // 如果断言正确执行代码
}


// 多个类型判断
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