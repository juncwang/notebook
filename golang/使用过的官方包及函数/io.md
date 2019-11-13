### 概述
+ io包提供了对I/O原语的基本接口。本包的基本任务是包装这些原语已有的实现（如os包里的原语），使之成为共享的公共接口，这些公共接口抽象出了泛用的函数并附加了一些相关的原语的操作。
+ 因为这些接口和原语是对底层实现完全不同的低水平操作的包装，除非得到其它方面的通知，客户端不应假设它们是并发执行安全的。

### 索引

+ `func Copy(dst Writer, src Reader) (written int64, err error)`

### 说明

+ `func Copy(dst Writer, src Reader) (written int64, err error)`
    + 将src的数据拷贝到dst，直到在src上到达EOF或发生错误。返回拷贝的字节数和遇到的第一个错误。
    + 对成功的调用，返回值err为nil而非EOF，因为Copy定义为从src读取直到EOF，它不会将读取到EOF视为应报告的错误。如果src实现了WriterTo接口，本函数会调用src.WriteTo(dst)进行拷贝；否则如果dst实现了ReaderFrom接口，本函数会调用dst.ReadFrom(src)进行拷贝。