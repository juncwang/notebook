##### vue 部分模块安装后引用时找不到模块处理
1. 安装 `npm install @types/模块名称` 
    * 这种方法适用于部分第三方模块

2. 在 `/src/shims-vue.d.ts` 内增加对应需要的模块
    * `declare module '模块名称'`

##### 给 window 添加变量时报错
* 使用一下代码
```js
declare global {
    interface Window {
        varName: any
    }
}
```
* 添加以上代码后 `varName` 就可以在 window 上使用了