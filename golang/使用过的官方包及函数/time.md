### 概述
+ time包提供了时间的显示和测量用的函数。日历的计算采用的是公历。

### 索引

+ `func Now() Time`

+ `type Time`
    + `func (t Time) Unix() int64`
    + `func (t Time) UnixNano() int64`

### 说明

+ `func Now() Time`
    + Now返回当前本地时间。

+ `type Time`
    + Time代表一个纳秒精度的时间点。
    + 程序中应使用Time类型值来保存和传递时间，而不能用指针。就是说，表示时间的变量和字段，应为time.Time类型，而不是*time.Time.类型。一个Time类型值可以被多个go程同时使用。时间点可以使用Before、After和Equal方法进行比较。Sub方法让两个时间点相减，生成一个Duration类型值（代表时间段）。Add方法给一个时间点加上一个时间段，生成一个新的Time类型时间点。
    + Time零值代表时间点January 1, year 1, 00:00:00.000000000 UTC。因为本时间点一般不会出现在使用中，IsZero方法提供了检验时间是否显式初始化的一个简单途径。
    + 每一个时间都具有一个地点信息（及对应地点的时区信息），当计算时间的表示格式时，如Format、Hour和Year等方法，都会考虑该信息。Local、UTC和In方法返回一个指定时区（但指向同一时间点）的Time。修改地点/时区信息只是会改变其表示；不会修改被表示的时间点，因此也不会影响其计算。
    + `func (t Time) Unix() int64`
        + Unix将t表示为Unix时间，即从时间点January 1, 1970 UTC到时间点t所经过的时间（单位秒）。
    + `func (t Time) UnixNano() int64`
        + UnixNano将t表示为Unix时间，即从时间点January 1, 1970 UTC到时间点t所经过的时间（单位纳秒）。如果纳秒为单位的unix时间超出了int64能表示的范围，结果是未定义的。注意这就意味着Time零值调用UnixNano方法的话，结果是未定义的。