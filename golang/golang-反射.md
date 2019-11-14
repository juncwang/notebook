### golang 反射

+ 基本介绍
    1. 反射可以在运行时动态获取变量的各种信息, 比如变量的类型(type), 类别(kind)
    2. 如果是结构体变量, 可以获取到结构体本身的信息(包括结构体的字段, 方法)
    3. 通过反射, 可以修改变量的值, 可以调用关联的方法
    4. 使用反射, 需要 import "reflect"

+ 获取 reflect.Type 类型
    + `type := reflect.TypeOf(v)`

+ 获取 reflect.Value 类型
    + `value := reflect.ValueOf(v)`

+ 应用
```go
func test(b interface{}) {
	// 1-1. 将 interface{} 转成 reflect.Value
    rVal := reflect.ValueOf(b)
    // 1-2. 将 interface{} 转成 reflect.Type
    rType := reflect.TypeOf(b)
	// 2. 将 reflect.Value 转成 interface{}
	iVal := rVal.interface()
	// 3. 将 interface{} 转成原来的变量类型
	v := iVal.(int)
}
```

+ Kind
```go
func test(b interface{}) {
    rVal := reflect.ValueOf(b)
    // 获取 Kind 类型值
    kV := rVal.Kind()

    rType := reflect.TypeOf(b)
    // 获取 Kind 类型值
    kT := rType.Kind()

    // rVal 与 rType 获取的 Kind 是一样的
    // Type 是类型, Kind 是类别, Type 和 Kind 可能是相同的, 也可能是不同的
    // 比如: var num int = 10, num 的 Type 是 int, Kind 也是 int
    // 比如: var stu Student, stu 的 Type 是 包名.Student, Kind 是 struct
}
```

+ 通过反射改变值, 必须传入值的地址
```go
// 定义值
num := 100
// 将值的地址传入到反射函数中
rVal := reflect.ValueOf(&num)
// 使用 Elem() 函数解析指针类型获取真实的数并使用 SetInt 进行设置值
rVal.Elem().SetInt(200)
// print -> 200
fmt.Println(num)
```