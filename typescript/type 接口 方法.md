* 接口
    * `interface Point {}`
       

* 各种属性值
    * 一般属性 `param: number`
    * 可选属性 `param?: number`
    * 只读属性 `readonly param: number`
    * 其他属性 `[propName: string]: any` 指除了对象定义的属性外还可以拥有其他类型的属性 属性名为 string 值为任意类型
    * `(param01: number, param02: number): boolean` 基础函数不需要名字保持一致, 但是对应位置参数类型必须保持一致
    * `[index: number]: string` 表示索引值为数字, 返回值为 string --- `a[0] = "hello world"`

* 泛型
    * `Array<number>` 一般数组
    * `ReadonlyArray<number>` 只读数组