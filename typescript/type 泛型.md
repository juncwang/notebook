* 泛型
    * `function methodName<T>(paramName: T): T { return paramName }`
    * `function methodName<T>(paramName: T[]): T[] { return paramName }`
        * `let value = methodName<string>('hello')`
        * `let value = methodName('hello')`

* 泛型类 
    ```javascript
    class ClassName<T> { 
        value: T 
        method: (x: T, y: T) => T
    }
    let myValue = new ClassName<number>()
    myValue.value = 0
    myValue.add = function(x, y) { return x + y}
    ```

* 泛型约束
    ```javascript
    interface Lengthwise {
        length: number
    }
    function methodName<T extends Lengthwise>(paramName: T): T { return paramName}
    methodName([1,2,3])     // 如果传入没有 length 属性的值就会报错

    function getProperty<T, K extends keyof T>(obj: t, key: K){
        return obj[key]
    }
    let x = {a: 1, b:2, c:3}
    getProperty(x, 'a') // 如果传入非 x 的 key 就会报错

    function createInstance<T extends ClassName>(c: new() => T): T {
        return new c()
    }
    let child = createInstance(ClassNameChild) // 获得一个 ClassName 的子类
    ```

* 泛型交叉类型
    ```javascript
    function extend<T, U>(first: T, second: U): T&U {
        let result = {} as T&U
        for(let id in first) {
            result[id] = first[id] as any
        }
        for(let id in second) {
            if(!result.hasOwnProperty(id)) {
                result[id] = second[id] as any
            }
        }
        return result
    }
    var jim = extend(new Person('jim'), new ConsoleLogger()) // jim 就具有两个类型的所有方法及属性
    ```