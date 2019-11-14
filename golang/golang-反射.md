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
	// 1. 将 interface{} 转成 reflect.Value
    rVal := reflect.ValueOf(b)
    // 1. 将 interface{} 转成 reflect.Type
    rType := reflect.TypeOf(b)
	// 2. 将 reflect.Value 转成 interface{}
	iVal := rVal.interface()
	// 3. 将 interface{} 转成原来的变量类型
	v := iVal.(int)
}
```