### 概述
+ runtime包提供和go运行时环境的互操作，如控制go程的函数。它也包括用于reflect包的低层次类型信息；参见reflect报的文档获取运行时类型系统的可编程接口

### 索引

+ `func GOMAXPROCS(n int) int`
+ `func NumCPU() int`

### 说明

+ `func GOMAXPROCS(n int) int`
    + GOMAXPROCS设置可同时执行的最大CPU数，并返回先前的设置。 若 n < 1，它就不会更改当前设置。本地机器的逻辑CPU数可通过 NumCPU 查询。本函数在调度程序优化后会去掉
+ `func NumCPU() int`
    + NumCPU返回本地机器的逻辑CPU个数
