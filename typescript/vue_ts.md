* vue-property-decorator
    * vue-property-decorator 对 Vue 组件进行了一层封装，让 Vue 组件语法在结合了 TypeScript 语法之后更加扁平化：
    ```ts
    <template>
        <div>
            <input v-model="msg">
            <p>msg: {{ msg }}</p>
            <p>computed msg: {{ computedMsg }}</p>
            <button @click="greet">Greet</button>
        </div>
    </template>

    <script lang="ts">
    import Vue from 'vue'
    import {Component, Vue} from 'vue-property-decorator'

    @Component({
        compName
    })
    export default class App extends Vue {
        // 初始化数据
        msg = 123

        // 声明周期钩子
        mounted () {
        this.greet()
        }

        // 计算属性
        get computedMsg () {
        return 'computed ' + this.msg
        }

        // 方法
        greet () {
        alert('greeting: ' + this.msg)
        }
    }
    </script>
    ```
    * 上面的代码跟下面的代码作用是一样的
    ```js
    export default {
        data () {
            return {
            msg: 123
            }
        }

        // 声明周期钩子
        mounted () {
            this.greet()
        }

        // 计算属性
        computed: {
            computedMsg () {
            return 'computed ' + this.msg
            }
        }

        // 方法
        methods: {
            greet () {
            alert('greeting: ' + this.msg)
            }
        }
    }
    ```

* vue-property-decorator
    * vue-property-decorator 是在 vue-class-component 上增强了更多的结合 Vue 特性的装饰器，新增了这 7 个装饰器：
    * @Emit
    * @Inject
    * @Model
    * @Prop
    * @Provide
    * @Watch
    * @Component (从 vue-class-component 继承)
    * 在这里列举几个常用的@Prop/@Watch/@Component, 更多信息，详见官方文档 https://github.com/kaorun343/vue-property-decorator
    ```ts
    import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'

    @Component({
        components：{
            compName
        }
    })
    export class MyComponent extends Vue {
    
    @Prop()
    propA!: number

    @Prop({ default: 'default value' })
    propB: string

    @Prop([String, Boolean])
    propC: string | boolean

    @Prop({ type: null })
    propD: any

    @Watch('child')
    onChildChanged(val: string, oldVal: string) { }
    }
    ```
    * 上面的代码相当于：
    ```js
    export default {
        props: {
            checked: Boolean,
            propA: Number,
            propB: {
            type: String,
            default: 'default value'
            },
            propC: [String, Boolean],
            propD: { type: null }
        }
        methods: {
            onChildChanged(val, oldVal) { }
        },
        watch: {
            'child': {
            handler: 'onChildChanged',
            immediate: false,
            deep: false
            }
        }
    }
    ```

##### 在vue内使用第三方库 无法识别问题
* 在项目 src 目录下添加 shims-vue.d.ts 文件
```ts
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue-particles'
declare module 'md5'
```

##### 扩展对象 window
```ts
declare global {
    interface Window {
        // 扩展变量
        // 总览 - 运行数据
        initOperatingDataCharts: any
    }
}
```