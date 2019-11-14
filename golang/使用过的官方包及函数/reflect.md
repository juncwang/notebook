### 概述
+ reflect包实现了运行时反射，允许程序操作任意类型的对象。典型用法是用静态类型interface{}保存一个值，通过调用TypeOf获取其动态类型信息，该函数返回一个Type类型值。调用ValueOf函数返回一个Value类型值，该值代表运行时的数据。Zero接受一个Type类型参数并返回一个代表该类型零值的Value类型值

### 索引

+ `type Kind uint`
    + `func (k Kind) String() string`

+ `type StructField struct`
    + `type StructTag string`
        + `func (tag StructTag) Get(key string) string`

+ `type Type interface{}`
    + `func TypeOf(i interface{}) Type`

+ `type Value struct`
    + `func ValueOf(i interface{}) Value`
    + `func New(typ Type) Value`
    + `func (v Value) Interface() (i interface{})`
    + `func (v Value) Kind() Kind`
    + `func (v Value) Bool() bool`
    + `func (v Value) Int() int64`
    + `func (v Value) Uint() uint64`
    + `func (v Value) Float() float64`
    + `func (v Value) Complex() complex128`
    + `func (v Value) Bytes() []byte`
    + `func (v Value) String() string`
    + `func (v Value) Slice(i, j int) Value`
    + `func (v Value) Pointer() uintptr`
    + `func (v Value) Cap() int`
    + `func (v Value) Len() int`
    + `func (v Value) Elem() Value`
    + `func (v Value) SetBool(x bool)`
    + `func (v Value) SetInt(x int64)`
    + `func (v Value) SetUint(x uint64)`
    + `func (v Value) SetFloat(x float64)`
    + `func (v Value) SetComplex(x complex128)`
    + `func (v Value) SetBytes(x []byte)`
    + `func (v Value) SetString(x string)`
    + `func (v Value) SetPointer(x unsafe.Pointer)`
    + `func (v Value) SetCap(n int)`
    + `func (v Value) SetLen(n int)`
    + `func (v Value) SetMapIndex(key, val Value)`
    + `func (v Value) Set(x Value)`
    + `func (v Value) NumField() int`
    + `func (v Value) Field(i int) Value`
    + `func (v Value) FieldByName(name string) Value`
    + `func (v Value) NumMethod() int`
    + `func (v Value) Method(i int) Value`
    + `func (v Value) MethodByName(name string) Value`
    + `func (v Value) Call(in []Value) []Value`

### 说明

+ `type Kind uint`
    + Kind代表Type类型值表示的具体分类。零值表示非法分类。
    ```go
    const (
        Invalid Kind = iota
        Bool
        Int
        Int8
        Int16
        Int32
        Int64
        Uint
        Uint8
        Uint16
        Uint32
        Uint64
        Uintptr
        Float32
        Float64
        Complex64
        Complex128
        Array
        Chan
        Func
        Interface
        Map
        Ptr
        Slice
        String
        Struct
        UnsafePointer
    )
    ```

    + `func (k Kind) String() string`
        + 返回类型名的字符串

+ `type StructField struct`
    ```go
    type StructField struct {
        // Name是字段的名字。PkgPath是非导出字段的包路径，对导出字段该字段为""。
        // 参见http://golang.org/ref/spec#Uniqueness_of_identifiers
        Name    string
        PkgPath string
        Type      Type      // 字段的类型
        Tag       StructTag // 字段的标签
        Offset    uintptr   // 字段在结构体中的字节偏移量
        Index     []int     // 用于Type.FieldByIndex时的索引切片
        Anonymous bool      // 是否匿名字段
    }
    ```
    + StructField类型描述结构体中的一个字段的信息

    + `type StructTag string`
        + StructTag是结构体字段的标签。
        + 一般来说，标签字符串是（可选的）空格分隔的一连串`key:"value"`对。每个键都是不包含控制字符、空格、双引号、冒号的非空字符串。每个值都应被双引号括起来，使用go字符串字面语法

        + `func (tag StructTag) Get(key string) string`
            + Get方法返回标签字符串中键key对应的值。如果标签中没有该键，会返回""。如果标签不符合标准格式，Get的返回值是不确定的

+ `type Type`
    ```go
    type Type interface {
        // Kind返回该接口的具体分类
        Kind() Kind
        // Name返回该类型在自身包内的类型名，如果是未命名类型会返回""
        Name() string
        // PkgPath返回类型的包路径，即明确指定包的import路径，如"encoding/base64"
        // 如果类型为内建类型(string, error)或未命名类型(*T, struct{}, []int)，会返回""
        PkgPath() string
        // 返回类型的字符串表示。该字符串可能会使用短包名（如用base64代替"encoding/base64"）
        // 也不保证每个类型的字符串表示不同。如果要比较两个类型是否相等，请直接用Type类型比较。
        String() string
        // 返回要保存一个该类型的值需要多少字节；类似unsafe.Sizeof
        Size() uintptr
        // 返回当从内存中申请一个该类型值时，会对齐的字节数
        Align() int
        // 返回当该类型作为结构体的字段时，会对齐的字节数
        FieldAlign() int
        // 如果该类型实现了u代表的接口，会返回真
        Implements(u Type) bool
        // 如果该类型的值可以直接赋值给u代表的类型，返回真
        AssignableTo(u Type) bool
        // 如该类型的值可以转换为u代表的类型，返回真
        ConvertibleTo(u Type) bool
        // 返回该类型的字位数。如果该类型的Kind不是Int、Uint、Float或Complex，会panic
        Bits() int
        // 返回array类型的长度，如非数组类型将panic
        Len() int
        // 返回该类型的元素类型，如果该类型的Kind不是Array、Chan、Map、Ptr或Slice，会panic
        Elem() Type
        // 返回map类型的键的类型。如非映射类型将panic
        Key() Type
        // 返回一个channel类型的方向，如非通道类型将会panic
        ChanDir() ChanDir
        // 返回struct类型的字段数（匿名字段算作一个字段），如非结构体类型将panic
        NumField() int
        // 返回struct类型的第i个字段的类型，如非结构体或者i不在[0, NumField())内将会panic
        Field(i int) StructField
        // 返回索引序列指定的嵌套字段的类型，
        // 等价于用索引中每个值链式调用本方法，如非结构体将会panic
        FieldByIndex(index []int) StructField
        // 返回该类型名为name的字段（会查找匿名字段及其子字段），
        // 布尔值说明是否找到，如非结构体将panic
        FieldByName(name string) (StructField, bool)
        // 返回该类型第一个字段名满足函数match的字段，布尔值说明是否找到，如非结构体将会panic
        FieldByNameFunc(match func(string) bool) (StructField, bool)
        // 如果函数类型的最后一个输入参数是"..."形式的参数，IsVariadic返回真
        // 如果这样，t.In(t.NumIn() - 1)返回参数的隐式的实际类型（声明类型的切片）
        // 如非函数类型将panic
        IsVariadic() bool
        // 返回func类型的参数个数，如果不是函数，将会panic
        NumIn() int
        // 返回func类型的第i个参数的类型，如非函数或者i不在[0, NumIn())内将会panic
        In(i int) Type
        // 返回func类型的返回值个数，如果不是函数，将会panic
        NumOut() int
        // 返回func类型的第i个返回值的类型，如非函数或者i不在[0, NumOut())内将会panic
        Out(i int) Type
        // 返回该类型的方法集中方法的数目
        // 匿名字段的方法会被计算；主体类型的方法会屏蔽匿名字段的同名方法；
        // 匿名字段导致的歧义方法会滤除
        NumMethod() int
        // 返回该类型方法集中的第i个方法，i不在[0, NumMethod())范围内时，将导致panic
        // 对非接口类型T或*T，返回值的Type字段和Func字段描述方法的未绑定函数状态
        // 对接口类型，返回值的Type字段描述方法的签名，Func字段为nil
        Method(int) Method
        // 根据方法名返回该类型方法集中的方法，使用一个布尔值说明是否发现该方法
        // 对非接口类型T或*T，返回值的Type字段和Func字段描述方法的未绑定函数状态
        // 对接口类型，返回值的Type字段描述方法的签名，Func字段为nil
        MethodByName(string) (Method, bool)
        // 内含隐藏或非导出方法
    }
    ```
    + Type类型用来表示一个go类型。
    + 不是所有go类型的Type值都能使用所有方法。请参见每个方法的文档获取使用限制。在调用有分类限定的方法时，应先使用Kind方法获知类型的分类。调用该分类不支持的方法会导致运行时的panic

    + `func TypeOf(i interface{}) Type`
        + TypeOf返回接口中保存的值的类型，TypeOf(nil)会返回nil

+ `type Value struct`
    + Value为go值提供了反射接口。
    + 不是所有go类型值的Value表示都能使用所有方法。请参见每个方法的文档获取使用限制。在调用有分类限定的方法时，应先使用Kind方法获知该值的分类。调用该分类不支持的方法会导致运行时的panic。
    + Value类型的零值表示不持有某个值。零值的IsValid方法返回false，其Kind方法返回Invalid，而String方法返回"<invalid Value>"，所有其它方法都会panic。绝大多数函数和方法都永远不返回Value零值。如果某个函数/方法返回了非法的Value，它的文档必须显式的说明具体情况。
    + 如果某个go类型值可以安全的用于多线程并发操作，它的Value表示也可以安全的用于并发

    + `func ValueOf(i interface{}) Value`
        + ValueOf返回一个初始化为i接口保管的具体值的Value，ValueOf(nil)返回Value零值
    + `func New(typ Type) Value`
        + New返回一个Value类型值，该值持有一个指向类型为typ的新申请的零值的指针，返回值的Type为PtrTo(typ)
    + `func (v Value) Interface() (i interface{})`
        + 本方法返回v当前持有的值（表示为/保管在interface{}类型），等价于：
        + `var i interface{} = (v's underlying value)`
        + 如果v是通过访问非导出结构体字段获取的，会导致panic
    + `func (v Value) Kind() Kind`
        + Kind返回v持有的值的分类，如果v是Value零值，返回值为Invalid
    + `func (v Value) Bytes() []byte`
        + 返回v持有的[]byte类型值。如果v持有的值的类型不是[]byte会panic
    + `func (v Value) String() string`
        + 返回v持有的值的字符串表示。因为go的String方法的惯例，Value的String方法比较特别。和其他获取v持有值的方法不同：v的Kind是String时，返回该字符串；v的Kind不是String时也不会panic而是返回格式为"<T value>"的字符串，其中T是v持有值的类型
    + `func (v Value) Bool() bool`
        + 返回v持有的布尔值，如果v的Kind不是Bool会panic
    + `func (v Value) Int() int64`
        + 返回v持有的有符号整数（表示为int64），如果v的Kind不是Int、Int8、Int16、Int32、Int64会panic
    + `func (v Value) Uint() uint64`
        + 返回v持有的无符号整数（表示为uint64），如v的Kind不是Uint、Uintptr、Uint8、Uint16、Uint32、Uint64会panic
    + `func (v Value) Float() float64`
        + 返回v持有的浮点数（表示为float64），如果v的Kind不是Float32、Float64会panic
    + `func (v Value) Complex() complex128`
        + 返回v持有的复数（表示为complex64），如果v的Kind不是Complex64、Complex128会panic
    + `func (v Value) Slice(i, j int) Value`
        + 返回v[i:j]（v持有的切片的子切片的Value封装）；如果v的Kind不是Array、Slice或String会panic。如果v是一个不可寻址的数组，或者索引出界，也会panic
    + `func (v Value) Pointer() uintptr`
        + 将v持有的值作为一个指针返回。本方法返回值不是unsafe.Pointer类型，以避免程序员不显式导入unsafe包却得到unsafe.Pointer类型表示的指针。如果v的Kind不是Chan、Func、Map、Ptr、Slice或UnsafePointer会panic。
        + 如果v的Kind是Func，返回值是底层代码的指针，但并不足以用于区分不同的函数；只能保证当且仅当v持有函数类型零值nil时，返回值为0。
        + 如果v的Kind是Slice，返回值是指向切片第一个元素的指针。如果持有的切片为nil，返回值为0；如果持有的切片没有元素但不是nil，返回值不会是0
    + `func (v Value) Cap() int`
        + 返回v持有值的容量，如果v的Kind不是Array、Chan、Slice会panic
    + `func (v Value) Len() int`
        + 返回v持有值的长度，如果v的Kind不是Array、Chan、Slice、Map、String会panic
    + `func (v Value) Elem() Value`
        + Elem返回v持有的接口保管的值的Value封装，或者v持有的指针指向的值的Value封装。如果v的Kind不是Interface或Ptr会panic；如果v持有的值为nil，会返回Value零值
    + `func (v Value) SetBool(x bool)`
        + 设置v的持有值。如果v的Kind不是Bool或者v.CanSet()返回假，会panic
    + `func (v Value) SetInt(x int64)`
        + 设置v的持有值。如果v的Kind不是Int、Int8、Int16、Int32、Int64之一或者v.CanSet()返回假，会panic
    + `func (v Value) SetUint(x uint64)`
        + 设置v的持有值。如果v的Kind不是Uint、Uintptr、Uint8、Uint16、Uint32、Uint64或者v.CanSet()返回假，会panic
    + `func (v Value) SetFloat(x float64)`
        + 设置v的持有值。如果v的Kind不是Float32、Float64或者v.CanSet()返回假，会panic
    + `func (v Value) SetComplex(x complex128)`
        + 设置v的持有值。如果v的Kind不是Complex64、Complex128或者v.CanSet()返回假，会panic
    + `func (v Value) SetBytes(x []byte)`
        + 设置v的持有值。如果v持有值不是[]byte类型或者v.CanSet()返回假，会panic
    + `func (v Value) SetString(x string)`
        + 设置v的持有值。如果v的Kind不是String或者v.CanSet()返回假，会panic
    + `func (v Value) SetPointer(x unsafe.Pointer)`
        + 设置v的持有值。如果v的Kind不是UnsafePointer或者v.CanSet()返回假，会panic
    + `func (v Value) SetCap(n int)`
        + 设定v持有值的容量。如果v的Kind不是Slice或者n出界（小于长度或超出容量），将导致panic
    + `func (v Value) SetLen(n int)`
        + 设定v持有值的长度。如果v的Kind不是Slice或者n出界（小于零或超出容量），将导致panic
    + `func (v Value) SetMapIndex(key, val Value)`
        + 用来给v的映射类型持有值添加/修改键值对，如果val是Value零值，则是删除键值对。如果v的Kind不是Map，或者v的持有值是nil，将会panic。key的持有值必须可以直接赋值给v持有值类型的键类型。val的持有值必须可以直接赋值给v持有值类型的值类型
    + `func (v Value) Set(x Value)`
        + 将v的持有值修改为x的持有值。如果v.CanSet()返回假，会panic。x的持有值必须能直接赋给v持有值的类型
    + `func (v Value) NumField() int`
        + 返回v持有的结构体类型值的字段数，如果v的Kind不是Struct会panic
    + `func (v Value) Field(i int) Value`
        + Value 内无法获取到 Tag 如果需要获取, 则使用 Type 内的 Field 方法 `rType.Field(n).Tag.Get(str)`
        + 返回结构体的第i个字段（的Value封装）。如果v的Kind不是Struct或i出界会panic
    + `func (v Value) FieldByName(name string) Value`
        + 返回该类型名为name的字段（的Value封装）（会查找匿名字段及其子字段），如果v的Kind不是Struct会panic；如果未找到会返回Value零值
    + `func (v Value) NumMethod() int`
        + 返回v持有值的方法集的方法数目
    + `func (v Value) Method(i int) Value`
        + 结构体方法调用顺序是按 `ASCII` 码形式进行排序, 不是按先后顺序进行排序
        + 比如 `结构体有两个方法, 依次定义为 c() a(), 调用时根据 ASCII 顺序 Method(0)-> a(), Method(1)-> c()`
        + 返回v持有值类型的第i个方法的已绑定（到v的持有值的）状态的函数形式的Value封装。返回值调用Call方法时不应包含接收者；返回值持有的函数总是使用v的持有者作为接收者（即第一个参数）。如果i出界，或者v的持有值是接口类型的零值（nil），会panic
    + `func (v Value) MethodByName(name string) Value`
        + 返回v的名为name的方法的已绑定（到v的持有值的）状态的函数形式的Value封装。返回值调用Call方法时不应包含接收者；返回值持有的函数总是使用v的持有者作为接收者（即第一个参数）。如果未找到该方法，会返回一个Value零值
    + `func (v Value) Call(in []Value) []Value`
        + Call方法使用输入的参数in调用v持有的函数。例如，如果len(in) == 3，v.Call(in)代表调用v(in[0], in[1], in[2])（其中Value值表示其持有值）。如果v的Kind不是Func会panic。它返回函数所有输出结果的Value封装的切片。和go代码一样，每一个输入实参的持有值都必须可以直接赋值给函数对应输入参数的类型。如果v持有值是可变参数函数，Call方法会自行创建一个代表可变参数的切片，将对应可变参数的值都拷贝到里面