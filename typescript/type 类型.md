##### 类型
```ts
// 数字
// 十进制
let decLiteral: number = 20
// 十六进制
let hexLiteral: number = 0x14 
// 二进制
let bingryLiteral: number = 0b10100
// 八进制
let octalLiteral: number = 0o24

// 字符串
let name: string = "bob"
let age: number = 30
// 魔法字符串
let sentence = `Hello, my name is ${name}
                I'll be ${age + 1} year old next month.`

// 数组
let list: number[] = [1,2,3]
let list: Array<number> = [1,2,3]

// 元组
let x: [string, number] = ['hello', 10]

// 枚举类型
// 从 0 开始计数, 可以使用 Red = 1, 让其变成从 1 开始计数
enum Color {
    Red,
    Green,
    Blue
}
// 取出名称 - 取出 'Red'
Color[0]

// any 类型 - 不安全, 会跳过语法检查
let notSure: any = 4

// void 无类型
function noVoid(): void {}

// 联合类型
let num: number | null

// never 类型 - 所有类型的子类型
// 返回异常
function error():never { throw new Error('error')}
// 让无限循环不报错
function inifiniteLoop(): never {while(true){}}
```

##### 类型转换
```ts
let someValue: any = 'hello world'
let strLength: number = (<string>someValue).length
let strLength: number = (someValue as string).length
```