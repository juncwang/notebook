### 概述
+ json包实现了json对象的编解码，参见RFC 4627。Json对象和go类型的映射关系请参见Marshal和Unmarshal函数的文档

### 索引

+ `func Marshal(v interface{}) ([]byte, error)`
+ `func Unmarshal(data []byte, v interface{}) error`
 
### 说明

+ `func Marshal(v interface{}) ([]byte, error)`
    + Marshal函数返回v的json编码
    + 结构体标签值里的"json"键为键名，后跟可选的逗号和选项，举例如下：
    ```go
    // 字段被本包忽略
    Field int `json:"-"`
    // 字段在json里的键为"myName"
    Field int `json:"myName"`
    // 字段在json里的键为"myName"且如果字段为空值将在对象中省略掉
    Field int `json:"myName,omitempty"`
    // 字段在json里的键为"Field"（默认值），但如果字段为空值会跳过；注意前导的逗号
    Field int `json:",omitempty"`
    ``` 
    + "string"选项标记一个字段在编码json时应编码为字符串。它只适用于字符串、浮点数、整数类型的字段。这个额外水平的编码选项有时候会用于和javascript程序交互：
    ```go
    Int64String int64 `json:",string"`
    ```
    + Go结构体字段的可视性规则用于供json决定那个字段应该序列化或反序列化时是经过修正了的。如果同一层次有多个（匿名）字段且该层次是最小嵌套的（嵌套层次则使用默认go规则），会应用如下额外规则：
        1. json标签为"-"的匿名字段强行忽略，不作考虑；
        2. json标签提供了键名的匿名字段，视为非匿名字段；
        3. 其余字段中如果只有一个匿名字段，则使用该字段；
        4. 其余字段中如果有多个匿名字段，但压平后不会出现冲突，所有匿名字段压平；
        5. 其余字段中如果有多个匿名字段，但压平后出现冲突，全部忽略，不产生错误。

+ `func Unmarshal(data []byte, v interface{}) error`
    + Unmarshal函数解析json编码的数据并将结果存入v指向的值。
    + 要将json数据解码写入一个接口类型值，函数会将数据解码为如下类型写入接口：
    ```
    Bool                   对应JSON布尔类型
    float64                对应JSON数字类型
    string                 对应JSON字符串类型
    []interface{}          对应JSON数组
    map[string]interface{} 对应JSON对象
    nil                    对应JSON的null
    ```