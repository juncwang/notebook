### 概述
+ bufio包实现了有缓冲的I/O。它包装一个io.Reader或io.Writer接口对象，创建另一个也实现了该接口，且同时还提供了缓冲和一些文本I/O的帮助函数的对象。

### 索引

+ `type Reader`
    + `func NewReader(rd io.Reader) *Reader`

### 说明

+ `type Reader`
    + Reader实现了给一个io.Reader接口对象附加缓冲。
    + `func NewReader(rd io.Reader) *Reader`
        + NewReader创建一个具有默认大小缓冲、从r读取的*Reader。