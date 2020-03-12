* 类
    * `class ClassName{}`

* 构造器
    * `constructor (param: type) {}`


* 各种属性值
    * 一般属性 `param: number`
    * 可选属性 `param?: number`
    * 只读属性 `readonly param: number`
    * 其他属性 `[propName: string]: any` 指除了对象定义的属性外还可以拥有其他类型的属性 属性名为 string 值为任意类型
    * `(param01: number, param02: number): boolean` 基础函数不需要名字保持一致, 但是对应位置参数类型必须保持一致
    * `[index: number]: string` 表示索引值为数字, 返回值为 string --- `a[0] = "hello world"`

* 修饰符
    * `public` 公有, 所有地方都可以使用
    * `private` 私有, 不能在类外部使用
    * `protected` 能在子类内部使用, 不能在类外部使用

    * `readonly` 外部可以使用, 但不能修改

    * `static` 类的静态属性
        * `let NewClass: typeof ClassName = ClassName` 通过这样定义参数可以修改类的静态参数值
            * `NewClass.staticParam = xxxx` 修改类的静态参数值
            * `let newClass: ClassName = new NewClass()` newClass 获得新的静态参数的对象

* 存取器
    * `get methodName(): paramType {return param}`  取
        * `classObj.methodName` 执行并返回 methodName 方法
    * `set methodName(param: type) { ... }` 存
        * `classObj.methodName = param` 执行 methodName 方法

* 创建实例 
    * `new ClassName(param: type)` 程序会自动调用类的构造器

* 抽象类
    * `abstract class ClassName {}`
    * 抽象方法 `abstract methodName(param: type): type {}`