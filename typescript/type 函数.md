* 函数
    * `function add(x: number, y: number) :number { return x + y )`
    * `let myAdd: (x: number, y: number) => number = function(x: number, y: number): number { return x + y}`

* 参数
    * 可选参数 `paramName?: number` 只能在最后
    * 联合类型 `paramName: number | string` 
    * 默认初始化参数 `paramName = 18: number` 如果参数在其他参数之前就不需传递 undefined 来使用默认参数
    * 剩余参数 `...ParamName: number[]` 只能在最后

* 联合类型保护
    * `function isFish(pet: Fish | Bird): pet is Fish {return (pet as Fish).swin !=== undefined}`
    * `typeof param === 'type'` 基础类型
    * `className instanceof ClassType` 类类型