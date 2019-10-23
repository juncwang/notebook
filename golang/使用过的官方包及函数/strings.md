### 概述
+ strings包实现了用于操作字符的简单函数。

### 索引

+ `func EqualFold(s, t string) bool`
+ `func HasPrefix(s, prefix string) bool`
+ `func HasSuffix(s, suffix string) bool`
+ `func Contains(s, substr string) bool`
+ `func Count(s, sep string) int`
+ `func Index(s, sep string) int`
+ `func LastIndex(s, sep string) int`
+ `func Replace(s, old, new string, n int) string`
+ `func Split(s, sep string) []string`
+ `func ToLower(s string) string`
+ `func ToUpper(s string) string`
+ `func TrimSpace(s string) string`
+ `func Trim(s string, cutset string) string`
+ `func TrimLeft(s string, cutset string) string`
+ `func TrimRight(s string, cutset string) string`

### 说明

+ `func EqualFold(s, t string) bool`
    + 判断两个utf-8编码字符串（将unicode大写、小写、标题三种格式字符视为相同）是否相同。
+ `func HasPrefix(s, prefix string) bool`
    + 判断s是否有前缀字符串prefix。
+ `func HasSuffix(s, suffix string) bool`
    + 判断s是否有后缀字符串suffix。
+ `func Contains(s, substr string) bool`
    + 判断字符串s是否包含子串substr。
+ `func Count(s, sep string) int`
    + 返回字符串s中有几个不重复的sep子串。
+ `func Index(s, sep string) int`
    + 子串sep在字符串s中第一次出现的位置，不存在则返回-1。
+ `func LastIndex(s, sep string) int`
    + 子串sep在字符串s中最后一次出现的位置，不存在则返回-1。
+ `func Replace(s, old, new string, n int) string`
    + 返回将s中前n个不重叠old子串都替换为new的新字符串，如果n<0会替换所有old子串。
+ `func Split(s, sep string) []string`
    + 用去掉s中出现的sep的方式进行分割，会分割到结尾，并返回生成的所有片段组成的切片（每一个sep都会进行一次切割，即使两个sep相邻，也会进行两次切割）。如果sep为空字符，Split会将s切分成每一个unicode码值一个字符串。
+ `func ToLower(s string) string`
    + 返回将所有字母都转为对应的小写版本的拷贝。
+ `func ToUpper(s string) string`
    + 返回将所有字母都转为对应的大写版本的拷贝。
+ `func TrimSpace(s string) string`
    + 返回将s前后端所有空白（unicode.IsSpace指定）都去掉的字符串。
+ `func Trim(s string, cutset string) string`
    + 返回将s前后端所有cutset包含的utf-8码值都去掉的字符串。
+ `func TrimLeft(s string, cutset string) string`
    + 返回将s前端所有cutset包含的utf-8码值都去掉的字符串。
+ `func TrimRight(s string, cutset string) string`
    + 返回将s后端所有cutset包含的utf-8码值都去掉的字符串。
