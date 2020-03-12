* 类
    * `class ClassName{}`

* 构造器
    * `constructor (param: type) {}`

* 修饰符
    * `public` 公有, 所有地方都可以使用
    * `private` 私有, 不能在类外部使用
    * `protected` 能在子类内部使用, 不能在类外部使用

    * `readonly` 外部可以使用, 但不能修改

    * `static` 类的静态属性

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