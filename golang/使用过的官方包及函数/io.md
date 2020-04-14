### 概述
+ io包提供了对I/O原语的基本接口。本包的基本任务是包装这些原语已有的实现（如os包里的原语），使之成为共享的公共接口，这些公共接口抽象出了泛用的函数并附加了一些相关的原语的操作。
+ 因为这些接口和原语是对底层实现完全不同的低水平操作的包装，除非得到其它方面的通知，客户端不应假设它们是并发执行安全的。

### 索引

+ `Variables`
    + `var EOF = errors.New("EOF")`

+ `type Reader interface`
+ `type Closer interface`
+ `type ReadCloser interface`

+ `func Copy(dst Writer, src Reader) (written int64, err error)`

### 说明

+ `Variables`
    + `var EOF = errors.New("EOF")`
        + EOF当无法得到更多输入时，Read方法返回EOF。当函数一切正常的到达输入的结束时，就应返回EOF。如果在一个结构化数据流中EOF在不期望的位置出现了，则应返回错误ErrUnexpectedEOF或者其它给出更多细节的错误。

+ `type Reader interface`
    + Reader接口用于包装基本的读取方法。
    + Read方法读取len(p)字节数据写入p。它返回写入的字节数和遇到的任何错误。即使Read方法返回值n < len(p)，本方法在被调用时仍可能使用p的全部长度作为暂存空间。如果有部分可用数据，但不够len(p)字节，Read按惯例会返回可以读取到的数据，而不是等待更多数据。
    +当Read在读取n > 0个字节后遭遇错误或者到达文件结尾时，会返回读取的字节数。它可能会在该次调用返回一个非nil的错误，或者在下一次调用时返回0和该错误。一个常见的例子，Reader接口会在输入流的结尾返回非0的字节数，返回值err == EOF或err == nil。但不管怎样，下一次Read调用必然返回(0, EOF)。调用者应该总是先处理读取的n > 0字节再处理错误值。这么做可以正确的处理发生在读取部分数据后的I/O错误，也能正确处理EOF事件。
    + 如果Read的某个实现返回0字节数和nil错误值，表示被阻碍；调用者应该将这种情况视为未进行操作。
    + 代码:
    ```go
    type Reader interface {
        Read(p []byte) (n int, err error)
    }
    ```
+ `type Closer interface`
    + Closer接口用于包装基本的关闭方法。
    + 在第一次调用之后再次被调用时，Close方法的的行为是未定义的。某些实现可能会说明他们自己的行为。
    + 代码:
    ```go
    type Closer interface {
        Close() error
    }
    ```

+ `type ReadCloser interface`
    + ReadCloser接口聚合了基本的读取和关闭操作。
    + 代码:
    ```go
    type ReadCloser interface {
        Reader
        Closer
    }
    ```

+ `func Copy(dst Writer, src Reader) (written int64, err error)`
    + 将src的数据拷贝到dst，直到在src上到达EOF或发生错误。返回拷贝的字节数和遇到的第一个错误。
    + 对成功的调用，返回值err为nil而非EOF，因为Copy定义为从src读取直到EOF，它不会将读取到EOF视为应报告的错误。如果src实现了WriterTo接口，本函数会调用src.WriteTo(dst)进行拷贝；否则如果dst实现了ReaderFrom接口，本函数会调用dst.ReadFrom(src)进行拷贝。