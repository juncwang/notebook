### 概述
+ bufio包实现了有缓冲的I/O。它包装一个io.Reader或io.Writer接口对象，创建另一个也实现了该接口，且同时还提供了缓冲和一些文本I/O的帮助函数的对象。

### 索引

+ `type Reader`
    + `func NewReader(rd io.Reader) *Reader`
    + `func (b *Reader) ReadString(delim byte) (line string, err error)`

+ `type Writer`
    + `func NewWriter(w io.Writer) *Writer`
    + `func (b *Writer) WriteString(s string) (int, error)`
    + `func (b *Writer) Flush() error`

### 说明

+ `type Reader`
    + Reader实现了给一个io.Reader接口对象附加缓冲。

    + `func NewReader(rd io.Reader) *Reader`
        + NewReader创建一个具有默认大小缓冲、从r读取的*Reader。
    + `func (b *Reader) ReadString(delim byte) (line string, err error)`
        + ReadString读取直到第一次遇到delim字节，返回一个包含已读取的数据和delim字节的字符串。如果ReadString方法在读取到delim之前遇到了错误，它会返回在错误之前读取的数据以及该错误（一般是io.EOF）。当且仅当ReadString方法返回的切片不以delim结尾时，会返回一个非nil的错误。

+ `type Writer`
    + Writer实现了为io.Writer接口对象提供缓冲。如果在向一个Writer类型值写入时遇到了错误，该对象将不再接受任何数据，且所有写操作都会返回该错误。在说有数据都写入后，调用者有义务调用Flush方法以保证所有的数据都交给了下层的io.Writer。

    + `func NewWriter(w io.Writer) *Writer`
        + NewWriter创建一个具有默认大小缓冲、写入w的*Writer。
    + `func (b *Writer) WriteString(s string) (int, error)`
        + WriteString写入一个字符串。返回写入的字节数。如果返回值nn < len(s)，还会返回一个错误说明原因。
    + `func (b *Writer) Flush() error`
        + Flush方法将缓冲中的数据写入下层的io.Writer接口。