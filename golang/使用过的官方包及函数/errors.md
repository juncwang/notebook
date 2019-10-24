### 概述
+ errors包实现了创建错误值的函数。

### 索引

+ `func New(text string) error`

### 说明

+ `func New(text string) error`
    + 使用字符串创建一个错误,请类比fmt包的Errorf方法，差不多可以认为是New(fmt.Sprintf(...))。