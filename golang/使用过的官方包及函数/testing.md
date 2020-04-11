### 概述

+ 命令 `go test` 简单测试信息 `go test -v` 详细测试信息

+ testing 提供对 Go 包的自动化测试的支持。通过 `go test` 命令，能够自动执行如下形式的任何函数：
`func TestXxx(*testing.T)`
+ 其中 Xxx 可以是任何字母数字字符串（但第一个字母不能是 [a-z]），用于识别测试例程。
+ 在这些函数中，使用 Error, Fail 或相关方法来发出失败信号。
+ 要编写一个新的测试套件，需要创建一个名称以 _test.go 结尾的文件，该文件包含 `TestXxx` 函数，如上所述。 将该文件放在与被测试的包相同的包中。该文件将被排除在正常的程序包之外，但在运行 “go test” 命令时将被包含。 有关详细信息，请运行 “go help test” 和 “go help testflag” 了解。
+ 如果有需要，可以调用 *T 和 *B 的 Skip 方法，跳过该测试或基准测试：
```go
func TestTimeConsuming(t *testing.T) {
    if testing.Short() {
        t.Skip("skipping test in short mode.")
    }
    ...
}
```

### 索引

+ `func TestMain(m *testing.M)`
+ `TestUser_AddUser(t *testing.T)`

+ `type M struct`
    + `func (m *M) Run() int`

+ `type T struct `
    + `func (c *T) Fatalf(format string, args ...interface{})`
    + `func (c *T) Logf(format string, args ...interface{})`
    * `func (t *T) Run(name string, f func(t *T)) bool`
 

### 说明

+ `func TestMain(m *testing.M)`
    + 在测试的其他函数执行前执行, 如果没有 m.Run 方法, 其他测试函数将不被执行
    + `func (m *M) Run() int`
        + Run 运行这些测试。它返回要传递给 os.Exit 的退出代码。
+ `func TestXXXX(t *testing.T)`
    + 会顺序执行的测试函数

+ `type M struct`
    + M 是传递给 TestMain 函数以运行实际测试的类型。
    + `func (m *M) Run() int`
        + Run 运行这些测试。它返回要传递给 os.Exit 的退出代码。 m 不允许此函数, 其他测试程序将不被执行

+ `type T struct `
    + T 是传递给测试函数的一种类型，它用于管理测试状态并支持格式化测试日志。测试日志会在执行测试的过程中不断累积， 并在测试完成时转储至标准输出。
    + 当一个测试的测试函数返回时， 又或者当一个测试函数调用 FailNow 、 Fatal 、 Fatalf 、 SkipNow 、 Skip 或者 Skipf 中的任意一个时， 该测试即宣告结束。 跟 Parallel 方法一样， 以上提到的这些方法只能在运行测试函数的 goroutine 中调用。
    + 至于其他报告方法， 比如 Log 以及 Error 的变种， 则可以在多个 goroutine 中同时进行调用。

    + `func (c *T) Fatalf(format string, args ...interface{})`
        + 调用 Fatalf 相当于在调用 Logf 之后调用 FailNow 。
    + `func (c *T) Logf(format string, args ...interface{})`
        + Log 使用与 Printf 相同的格式化语法对它的参数进行格式化，然后将格式化后的文本记录到错误日志里面。 如果输入的格式化文本最末尾没有出现新行，那么将一个新行添加到格式化后的文本末尾。
        1. 对于测试来说，Logf 产生的格式化文本只会在测试失败或者设置了 -test.v 标志的情况下被打印出来
        2. 对于基准测试来说，为了避免 -test.v 标志的值对测试的性能产生影响，Logf 产生的格式化文本总会被打印出来
    + `func (t *T) Run(name string, f func(t *T)) bool`
        + 执行名字为 name 的子测试 f ，并报告 f 在执行过程中是否出现了任何失败。Run 将一直阻塞直到 f 的所有并行测试执行完毕。
        + Run 可以在多个 goroutine 里面同时进行调用，但这些调用必须发生在 t 的外层测试函数（outer test function）返回之前。