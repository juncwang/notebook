### 概述

+ template包（html/template）实现了数据驱动的模板，用于生成可对抗代码注入的安全HTML输出。本包提供了和text/template包相同的接口，无论何时当输出是HTML的时候都应使用本包。
+ 此处的文档关注本包的安全特性。至于如何使用模板，请参照text/template包。

### 索引

+ `type Template struct`
    + `func Must(t *Template, err error) *Template`
    + `func New(name string) *Template`
    + `func ParseFiles(filenames ...string) (*Template, error)`
    + `func ParseGlob(pattern string) (*Template, error)`
    + `func (t *Template) ParseFiles(filenames ...string) (*Template, error)`
    + `func (t *Template) ParseGlob(pattern string) (*Template, error)`
    + `func (t *Template) Execute(wr io.Writer, data interface{}) error`
    + `func (t *Template) ExecuteTemplate(wr io.Writer, name string, data interface{}) error`

### 说明

+ `type Template struct`
    + Template类型是text/template包的Template类型的特化版本，用于生成安全的HTML文本片段。
    + 代码:
    ```go
    type Template struct {
        // 底层的模板解析树，会更新为HTML安全的
        Tree *parse.Tree
        // 内含隐藏或非导出字段
    }
    ```
    + `func Must(t *Template, err error) *Template`
        + Must函数用于包装返回(*Template, error)的函数/方法调用，它会在err非nil时panic，一般用于变量初始化：
        + `var t = template.Must(template.New("name").Parse("html"))`
    + `func New(name string) *Template`
        + 创建一个名为name的模板。
    + `func ParseFiles(filenames ...string) (*Template, error)`
        + ParseFiles函数创建一个模板并解析filenames指定的文件里的模板定义。返回的模板的名字是第一个文件的文件名（不含扩展名），内容为解析后的第一个文件的内容。至少要提供一个文件。如果发生错误，会停止解析并返回nil。
    + `func ParseGlob(pattern string) (*Template, error)`
        + ParseGlob创建一个模板并解析匹配pattern的文件（参见glob规则）里的模板定义。返回的模板的名字是第一个匹配的文件的文件名（不含扩展名），内容为解析后的第一个文件的内容。至少要存在一个匹配的文件。如果发生错误，会停止解析并返回nil。ParseGlob等价于使用匹配pattern的文件的列表为参数调用ParseFiles。
    + `func (t *Template) ParseFiles(filenames ...string) (*Template, error)`
        + ParseGlob方法解析filenames指定的文件里的模板定义并将解析结果与t关联。如果发生错误，会停止解析并返回nil，否则返回(t, nil)。至少要提供一个文件。
    + `func (t *Template) ParseGlob(pattern string) (*Template, error)`
        + ParseFiles方法解析匹配pattern的文件里的模板定义并将解析结果与t关联。如果发生错误，会停止解析并返回nil，否则返回(t, nil)。至少要存在一个匹配的文件。
    + `func (t *Template) Execute(wr io.Writer, data interface{}) error`
        + Execute方法将解析好的模板应用到data上，并将输出写入wr。如果执行时出现错误，会停止执行，但有可能已经写入wr部分数据。模板可以安全的并发执行
    + `func (t *Template) ExecuteTemplate(wr io.Writer, name string, data interface{}) error`
        + ExecuteTemplate方法类似Execute，但是使用名为name的t关联的模板产生输出。

### 动作

* 数据
    * `{{.}}` 
        * 通过 t.Execute(w, `数据`) 可对`{{.}}`进行替换

* 条件
    * `{{if .}} ... {{end}}`
    * `{{if .}} ... {{else}} ... {{end}}`
        * `.` 是传递给条件动作的判断参数

* 迭代
    * `{{range .}} ... {{.}} ... {{end}}`
    * `{{range .}} ... {{.}} ... {{else}} ... {{end}}`
        * 遍历数组 
        * `{{.}}` 代表遍历时得到的元素
            * `{{.param}}` 可得到元素对象的参数
        * `{{else}}` 没有遍历到任何元素
    * `{{range $k, $v := .}} ... {{$k}} ... {{$k}} ...{{end}}`
        * 遍历 map 变量用 $ 开头
        * `$k` 建 `$v` 值
    * `{{c1 | c2 | c3}}`
        * 遍历管道
        * c1 c2 c3 可以使参数或函数

* 设置
    * `{{with arg}} ... {{.}} ... {{end}}`
    * `{{with arg}} ... {{.}} ... {{else}} ... {{.}} ... {{end}}`
        * arg 为设定的一个参数与传过来的值进行比较
        * arg 有具体值时 不论传入什么值都会显示 arg 本身
        * arg 为 "" 时 会通过 else 显示后台传回的值

* 包含
    * `{{template "name"}}`
    * `{{template "name" .}}`
        * 这里需要给多个模板 t.ParseFiles("1.html", "2.html")
        * 如果在第一个模板中使用 {{template "2.html"}}
        * 如果需要第二个模板得到值需要在后面加入参数 {{template "2.html" .}}

* 定义动作
    * `{{define "model"}}`
    * `<html><body> ...`
    * `{{template "content"}}`
    * `...</body></html>`
    * `{{end}}`

    * `{{ define "content"}} ... {{end}}`
        * 自定义模板
        * 调用时需要使用 t.ExecuteTemplate(w, content, "parame")

* 块动作
    * `{{block "content" .}} ... {{end}}`
        * 设置默认模板
        * 如果 定义模板没有找到 就使用 默认的模板