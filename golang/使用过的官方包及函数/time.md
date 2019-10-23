### 概述
+ time包提供了时间的显示和测量用的函数。日历的计算采用的是公历。

### 索引

+ `type Duration int64`

+ `func Now() Time`
+ `func Sleep(d Duration)`

+ `type Time`
    + `func (t Time) Unix() int64`
    + `func (t Time) UnixNano() int64`
    + `func (t Time) Year() int`
    + `func (t Time) Month() Month`
    + `func (t Time) Day() int`
    + `func (t Time) Hour() int`
    + `func (t Time) Minute() int`
    + `func (t Time) Second() int`
    + `func (t Time) Format(layout string) string`

+ `type Month int`
    + `func (m Month) String() string`
 

### 说明

+ `type Duration int64`
    + Duration类型代表两个时间点之间经过的时间，以纳秒为单位。可表示的最长时间段大约290年。
    ```
    const (
        Nanosecond  Duration = 1
        Microsecond          = 1000 * Nanosecond
        Millisecond          = 1000 * Microsecond
        Second               = 1000 * Millisecond
        Minute               = 60 * Second
        Hour                 = 60 * Minute
    )
    ```
    + 常用的时间段。没有定义一天或超过一天的单元，以避免夏时制的时区切换的混乱。
    + 要将Duration类型值表示为某时间单元的个数，用除法：
    ```
    second := time.Second
    fmt.Print(int64(second/time.Millisecond)) // prints 1000
    ```
    + 要将整数个某时间单元表示为Duration类型值，用乘法：
    ```
    seconds := 10
    fmt.Print(time.Duration(seconds)*time.Second) // prints 10s
    ```

+ `func Now() Time`
    + Now返回当前本地时间。
+ `func Sleep(d Duration)`
    + Sleep阻塞当前go程至少d代表的时间段。d<=0时，Sleep会立刻返回。

+ `type Time`
    + Time代表一个纳秒精度的时间点。
    + 程序中应使用Time类型值来保存和传递时间，而不能用指针。就是说，表示时间的变量和字段，应为time.Time类型，而不是*time.Time.类型。一个Time类型值可以被多个go程同时使用。时间点可以使用Before、After和Equal方法进行比较。Sub方法让两个时间点相减，生成一个Duration类型值（代表时间段）。Add方法给一个时间点加上一个时间段，生成一个新的Time类型时间点。
    + Time零值代表时间点January 1, year 1, 00:00:00.000000000 UTC。因为本时间点一般不会出现在使用中，IsZero方法提供了检验时间是否显式初始化的一个简单途径。
    + 每一个时间都具有一个地点信息（及对应地点的时区信息），当计算时间的表示格式时，如Format、Hour和Year等方法，都会考虑该信息。Local、UTC和In方法返回一个指定时区（但指向同一时间点）的Time。修改地点/时区信息只是会改变其表示；不会修改被表示的时间点，因此也不会影响其计算。
    + `func (t Time) Unix() int64`
        + Unix将t表示为Unix时间，即从时间点January 1, 1970 UTC到时间点t所经过的时间（单位秒）。
    + `func (t Time) UnixNano() int64`
        + UnixNano将t表示为Unix时间，即从时间点January 1, 1970 UTC到时间点t所经过的时间（单位纳秒）。如果纳秒为单位的unix时间超出了int64能表示的范围，结果是未定义的。注意这就意味着Time零值调用UnixNano方法的话，结果是未定义的。
    + `func (t Time) Year() int`
        + 返回时间点t对应的年份。
    + `func (t Time) Month() Month`
        + 返回时间点t对应那一年的第几月。
    + `func (t Time) Day() int`
        + 返回时间点t对应那一月的第几日。
    + `func (t Time) Hour() int`
        + 返回t对应的那一天的第几小时，范围[0, 23]。
    + `func (t Time) Minute() int`
        + 返回t对应的那一小时的第几分种，范围[0, 59]。
    + `func (t Time) Second() int`
        + 返回t对应的那一分钟的第几秒，范围[0, 59]。
    + `func (t Time) Format(layout string) string`
        + Format根据layout指定的格式返回t代表的时间点的格式化文本表示。layout定义了参考时间：
        ```
        Mon Jan 2 15:04:05 -0700 MST 2006
        ```
        + 格式化后的字符串表示，它作为期望输出的例子。同样的格式规则会被用于格式化时间。
        + 预定义的ANSIC、UnixDate、RFC3339和其他版式描述了参考时间的标准或便捷表示。要获得更多参考时间的定义和格式，参见本包的ANSIC和其他版式常量。

+ `type Month int`
    + Month代表一年的某个月。
    ```
    const (
        January Month = 1 + iota
        February
        March
        April
        May
        June
        July
        August
        September
        October
        November
        December
    )
    ```
    + `func (m Month) String() string`
        + String返回月份的英文名（"January"，"February"，……）