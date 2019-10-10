### vue

* 安装 3.x 方式
    * `npm install -g @vue/cli`

* 创建工程
    * `vue create projectName`

* 生产环境 nginx 服务器配置解决跨域及页面跳转问题
```conf
# 添加访问目录为/apis的代理配置
# VUE 生产环境访问地址需改为 /apis
location /apis { 
    rewrite  ^/apis/(.*)$ /$1 break;
    proxy_pass   http://192.168.78.113:5000;
}

location / {
    root   html;
    index  index.html index.htm;
    # 解决路径跳转问题
    try_files $uri $uri/ /index.html;
}
```

01. vue 3.x 安装方式
   * 访问网页 `https://github.com/vuejs/vue-cli` 
      * 进入网页后找到 `docs` 文件夹并进入
      * 根据文件夹说明文件 `README.md` 进行安装最新版 或 `npm install -g @vue/cli`
      * 根据文件夹说明文件 `README.md` 创建 `vue 3.x` 项目 或 `vue create my-project`
      * `vue ui` 通过图形化管理界面管理及创建项目
      
02. vue 3.x 创建项目配置文件 `.vuerc`
   * 在系统 (win: C:\Users\UserName\ | mac: UserName/ ) 用户路径下的 `.vuerc` 文件(可能是隐藏文件)
   * 该文件保存项目创建时的配置信息, 删除或清空内容后, 项目无法创建 (如果需要清空, 必须保留一个空对象 `{ }`）
   
03. vue 3.x 项目启动编译
   * `npm run serve` 启动项目-开发环境    
   * `npm run build` 启动项目-生成环境

04. vue 3.x 安装插件的方法
   * `vue add plugName` 新版安装命令
   * `npm install plugName` 旧版安装命令也可以使用
   
05. vue 插件库
   * `vuetify` vue ui 库
   * `vue-router` vue 路由 库
   * `axios` vue 网络请求 库
   * `vue-resource` vue 网络请求 库
   
06. vue 3.x 环境变量
   * 在项目根路径下创建以下环境变量文件
      * `.env` 默认环境变量文件 (只有在没有对应的环境变量文件时, 系统就会查找此文件的环境变量)
      * `.env.development` 开发环境变量文件
      * `.env.production`  生成环境变量文件
         * `VUE_APP_变量名 = 变量值` 文件内对环境变量的定义
            * `data(){ return {变量名:process.env.VUE_APP_变量名}` 通过 data 取出环境变量以便使用
            
07. vue 3.x 独立运行 vue 文件
   * `npm install -g @vue/cli-service-global` 安装 vue 全局服务
   * `vue serve 文件路径及文件名.vue` 独立运行 vue 文件
      
08. vue 3.x 配置文件
   * `vue.config.js` 在项目根目录下创建此文件
      ```js
      // 获取本地数据
      const goods = require('./data/goods.json')

      module.exports = {
      // 基础配置 ====================================================================
       baseUrl: '/',   // 根路径
       outputDir: 'dist',  // 构建输出目录
       assetsDir: 'assets',    // 静态资源目录(js,css,img,fonts)
       lintOnSave: false,  // 是否开启 eslint 保存检测, 有效值: true || false || 'error'
       configureWebpack: {  // 配置 Webpack 内容
           externals: {     // 配置 在 index.html 内引用的 <srcipt src="连接"></script> 的对象
               'AMap':'AMap'
           }
       },

       // 服务器配置 =================================================================
       devServer: {
              open: true,    // 开启服务后是否自动弹出页面
              host: 'localhost',  // 主机名称
              port: 8080, // 默认端口号
              https: false,    // 是否启用 https
              hotOnly: false, // 是否启用 vue 热更新 (webpack 已经实现可以不开启)
              proxy: {    // 配置跨域
                  '/api':{
                      target: 'http//localhost:5000/api/', // 设置跨域地址
                      ws: true,   // 是否实现跨域
                      changOrigin: true,  
                      pathRewrite: {  // 路径重写
                          '^/api' : ''
                      }
                  }
              },
              before(app) {   // 数据接口配置
                  // 配置数据访问路径
                  // http//localhost:8080/api/goods
                  app.get('/api/goods', (req, res)=> {
                      res.json(goods) // 调用接口时返回 goods 数据
                  })
              }
          }
      }
      ```

09. 定义组件后在组件内插入内容
```xml
<!-- 定义组件时写法 -->
<template>
    <div class="comName">
        <slot></slot>
    </div>
</template>

<!-- 使用时写法 -->
<template>
    <div class="otherComName">
        <comName>
            <!-- 这里写需要插入 comName 的内容 -->
        </comName>
    </div>
</template>
```



### Vue 2.X

01. vue 的引入及安装
    * 在 html 头文件内引入 `<script src="https://unpkg.com/vue"></script>` 就可使用 vue.js
    * 最新版本 vue 可登陆 `https://cn.vuejs.org` -> 起步  -> 安装
    * 如果需要搭建 `webpack` 环境也可以使用 npm 进行安装
        * ` npm install vue`
        * 详见官方文档

02. 实例化 vue 及基础参数的介绍
    * 实例化 vue 的方法
    ```js
    new Vue({
        el: '#vue-app',
        data: {
            name: 'Shaun'
        }
    });
    ```
    * el:   element 需要获取的元素, 一定是 html 中的根容器元素
    * data: 用于数据的存储
    * name: 供 html 使用的属性

03. vue 方法添加及方法使用属性
    * 定义方法
    ```js
    methods: {
        greet: function(time){
            return 'Good ' + time + ', ' + this.name;
        }
    }
    ```
    * methods:  用于方法存储
    * greet:    方法名
    * 在方法内调用内部属性使用 `this.属性名`
    * 在方法内使用外部元素需要利用方法的参数接受

04. vue 属性绑定 v-bind v-html
    * 在 `html` 文件标签内绑定属性值需要中属性前面加入 `v-bind:`
    * 例如: `<a v-bind:href="website">The Net Ninja Website</a>`
    * 在 `html` 文件标签内增加 `html` 内容, 需要中标签内加入一个属性值 `v-html`
    * 例如: `<p v-html="websiteTag"></p>`
        * websiteTag 的属性值为 `websiteTag: '<a href="http://www.thenetninja.co.uk">The Net Ninja Website</a>'`

05. vue 方法绑定 v-on
    * 在 `html` 文件标签内绑定方法时需要属性前面加入 `v-on:`
        * `v-on:` 可以简写为 `@`
    * 例如单击事件: `<button v-on:click="add()">Add a Year</button>`
    * 例如双击事件: `<button v-on:dblclick="add(10)">Add 10 Years</button>`
    * 例如获取鼠标事件: `<div id="canvas" v-on:mousemove="updateXY">{{ x }} , {{ y }}</div>`
        * 可以在方法中传递参数 `add(var)`
    * 如果在标签中的内容内加入方法需要 `<p>{{add()}}</p>`

06. vue 鼠标事件修饰符
    * 事件修饰符可以起到在 `html` 默认操作的情况下进行其他操作
    * 例如: `<a v-on:click.prevent="click" href="http://www.thenetninja.co.uk">The Net Ninja</a>` 可以实现阻止页面跳转并执行 `click`方法
    * 修饰符有: 
        1. once 只执行一次操作
        2. stop 阻止单击事件冒泡
        3. prevent 提交事件不再重载页面
        4. capture 添加事件监听器时使用事件捕获模式
        5. self 当事件在该元素本身(不是子元素)触发时触发回调

07. vue 键盘事件及修饰符
    * 键盘事件使用键盘修饰符的例子
    * 例如: `<input type="text" v-on:keyup="logName" />` 按键抬起时触发
    * 例如: `<input type="text" v-on:keyup.enter="logName" />` enter 按键抬起时触发
    * 例如: `<input type="text" v-on:keyup.alt.enter="logName" />` alt 按下 enter 按键抬起时触发
    * 可输入的地方才可以被触发键盘事件
    * 键盘操作修饰符有:
        1. keyup
        2. keydown
    * 键盘修饰符有: 
        1. enter
        2. tab
        3. delete
        4. esc
        5. space
        6. up
        7. down
        8. left
        9. right
        10. alt

08. vue 双向数据绑定 ref v-model
    * 必须使用在 `input select textarea` 标签
    * 利用标签 ref 及 v-model 实现双向绑定
    * 第一种方式 ref
    ```html
    <div id="vue-app">
        <!-- 利用 ref 属性把内容传递给vuejs 当调用方法时进行修改值 -->
        <input type="text" ref="name"  v-on:keyup.enter="logName" />
    </div>
    ```
    ```js
    new Vue({
        el: "#vue-app",
        data: {
            name: ""
        },
        methods:{
            logName:function(){
                // 拿到传入的内容后进行赋值实现绑定
                this.name = this.$refs.name.value
            }
        }
    })
    ```
    * 第二种方式 v-model
    ```html
    <div id="vue-app">
        <!-- 直接对 vue 对属性进行绑定 -->
        <!-- 利用 v-model 属性进行绑定操作, 它会直接将该标签对 value 与 vue 对属性进行绑定 -->
        <input type="text" v-on:keyup.enter="logName" v-model="name"/>
    </div>
    ```
    ```js
    new Vue({
        el: "#vue-app",
        data: {
            name: ""
        },
        methods:{
            logName:function(){
            }
        }
    })
    ```

09. vue 计算属性Computed
    * 计算属性需要放在容器对象内 `computed`
        * 计算属性与方法对区别
            * 计算属性每次调用只会执行属性本身对应对方法, 而方法则是把方法容器内对方法全部计算一次
            * 计算属性调用是不能和方法一样增加 `()`, 应该直接与调用属性一样进行使用 

10. vue 动态绑定 css
    * vue 实现 css 样式方法 `<div v-bind:class="{样式名称:true}"></div>`
    * vue 绑定 css 样式方法 `<div v-bind:class="{样式名称:属性名称-bool}"></div>`
    * vue 动态控制 css 样式方法 `<div v-on:click="属性名称-bool: !属性名称-bool" v-bind:class="{样式名称:属性名称-bool}"></div>`
    * css 的 class 属性需要加 `{}`

11. vue 指令 v-if v-else-if v-show
    * 使用方法: `<p v-if="error" class="error">There has been an error</p>` 如果 error 为 true 那么显示, 反之隐藏
    * 标签有: 
        * `v-if` 判断是否为真
        * `v-else-if` 如果上一个标签的 `v-if` 为假, 那么继续判断
        * `v-show` 是否显示, 该标签只是操作的 display 的值

12. vue 指令 v-for 及 template v-for
    * 使用方法1: `<li v-for="character in characters">{{ character }}</li>` 定义一个参数, 通过 in 链接到数组
    * 使用方法2: `<li v-for="(ninja, index) in ninjas">{{ index }} . {{ ninja.name }} - {{ ninja.age }}</li>` 定义两个参数, 第二个为序列号
    * 使用方法3: `<template v-for="ninja in ninjas">...</template>` 可以替换 div 标签, 去除不必要的标签
    * 使用方法4: `<div v-for="(val, key) in ninja">` 可以遍历对象 第一个参数为属性值, 第二个参数为属性名称
    * 实现 html 循环

### 13. vue 实战DEMO
    * 使用 vue 实现小游戏

14. vue 初始化多个 vue 对象
    * 可以通过把对象赋给变量来区分 vue 对象
    * 可以通过 变量名 来获取该变量的变量及方法

15. vue 组件的应用
    * 组件创建方式: 
    ```js
    Vue.component('TestComponent', {
        template: '<p>组件应用</p>',        // 组件必须定义在一个主标签中, 容器中可以定义多个标签, 可以与 html 内调用 vue 对象一样的调用
        data:function(){                   // 数据必须以方法返回形式定义
            return {
                name:"hello"               // 定义的数据
            }
        },
        methods:{                          // 定义方法与 vue 对象形式一样
        },
        computed:{                         // 定义运算式与 vue 对象形式一样
        }
    });
    ```
    * html 使用方法
    ```html
    <TestComponent></TestComponent>
    ```

### 16. vue 脚手架 cli
    * 安装 vue-cli
        * `npm install -g vue-cli`              安装全局 vue-cli
        * `vue init webpack project_name`       使用 vue webpack 创建项目 (注意: 必须先安装 webpack)
            * 第一个提示: 项目名称
            * 第二个提示: 项目描述
            * 第三个提示: 作者
            * 第四个提示: 选择安装内容 (enter)
            * 第五个提示: 是否安装 vue-router (n)
            * 第六个提示: 是否安装测试 ESLint (n)  
            * 第七个提示: 是否安装其他测试 (n)
            * 第八个提示: 选择测试类型 (enter)
            * 第九个提示: 是否安装e2e测试 (n)
            * 第十个提示: 用什么进行安装 (enter)
        * 等待安装完成后执行命令 `cd vue-playlist` 跳入项目文件夹内
        * 执行命令 `npm run dev` 开启项目

17. vue 项目内 src 文件流程及根组件介绍
    * 执行顺序 `index.html -> main.js -> App.vue`
    * App.vue 文件结构
        * `<template>` html 文件内容
        * `<script>` js 文件内容
        * `<style>` css 文件内容

18. vue 组件嵌套
    * 全局组件调用
        * 在 `main.js` 文件内对组件进行导入
            ```js
            import Ninjas from './Ninjas.vue'
            Vue.component('ninjas', Ninjas);
            ```
            * 这样就可以在 html 页面或其他 js vue 文件内直接使用 `<ninjas/>` 调用组件内容
    * 组件调用
        * 在 组件或 `App.vue` 中对组件进行导入
            ```js
            import Ninjas from './Ninjas.vue'
            export default {
                components: {
                    'ninjas': Ninjas
                }
            }
            ```
            * 这样就可以在该页面中使用导入的组件 `<ninjas/>` 

19. vue 组件 css 作用域
    * 组件在写样式的时候加入 scoped 关键字实现样式分离
    * `<style scoped></style>`
    * 不加关键字, 就一定会影响到其他组件的样式

### 20. vue 实战DEMO(组件嵌套)

21. vue 属性传值Props
    * 父组件传子组件
        * `<app-ninjas v-bind:ninjas="ninjas"></app-ninjas>` 父组件使用子组件时使用绑定参数
        ```js
        export default {
            // 传入参数列表
            props: {
                // 传入的参数 (名字对应父组件传入的名字)
                ninjas: {
                    // 传入的类型
                    type: Array,
                    // 默认值
                    default: "默认值",
                    // 接受参数
                    required: true
            },
            // props: [ "ninjas" ],     // 也可以写成数组形式
        }
        ```

22. vue 传值和传引用
    * 传值: String, Number, Boolean
    * 引用: Array, Object
    * 注意: 传值改变后不会影响其他接受值的地方的值, 传引用改变值后会影响其他接受值的地方的值

23. vue 事件传值(子to父)
    * 子组件需要注册一个事件 `$emit`
    ```html
    <h1 v-on:click="changeTitle">{{ title }}</h1>
    ```
    ```js
    methods: {
      changeTitle: function(){
        this.$emit('changeTitle', 'Vue Ninjas');
      }
    }
    ```
    * 父组件获取方式 使用 `$event` 获取子组件的参数
      * 也可以不传参数
    ```html
    <header v-bind:title="title" v-on:changeTitle="updateTitle($event)"></header>
    ```
    ```js
    * 接收方法必须有给形参进行接受
    methods: {
      updateTitle: function(updatedTitle){
        this.title = updatedTitle;
      }
    }
    ```

24. vue 生命周期执行顺序
    * 与 `data(), methods, props, computed` 平级方法
    ```js
    // 也可以写成 beforeCreate:function(){}
    beforeCreate(){
        alert('组件实例化之前执行的函数');
    },
    created(){
        alert('组件实例化完毕, 但页面还未显示');
    },
    beforeMount(){
        alert('组件挂载前, 页面还未展示, 但虚拟 DOM 已经配置');
    },
    mounted(){
        alert('组件挂载后, 此方法执行后, 页面显示');
    },
    beforeUpdate(){
        alert('组件更新前, 页面还未更新, 但虚拟DOM已经配置');
    },
    updated(){
        alert('组件更新, 此方法执行后, 页面显示');
    },
    beforeDestory(){
        alert('组件销毁前调用方法');
    },
    destoryed(){
        alert('组件销毁后调用方法');
    }
    ```

25. vue 路由和Http
    * 路由的安装命令
        * `npm install vue-router --save-dev`
    * vue-resource 的安装命令
        * `npm install vue-resource --save-dev`

    * 在 `main.js` 内引入使用配置路由模块
    ```js
    import Vue from 'vue'
    // 引入路由模块
    import VueRouter from 'vue-router'
    // 引入 vue-resource 模块
    import VueResource from 'vue-resource'
    import App from './App'
    // 引入组件
    import Home from './components/Home'
    import HelloWorld from './components/HelloWorld'

    Vue.config.productionTip = false
    // 使用路由模块
    Vue.use(VueRouter)
    // 使用 VueResource 模块
    Vue.use(VueResource)

    // 配置路由模块
    const router = new VueRouter({
        routes:[
            // 定义根目录上使用的组件模块
            {path:"/",component:Home},
            // 定义 /helloworld 模块上使用的组件模块
            {path:"/helloworld",component:HelloWorld}
        ],
        // 配置后地址上不再需要使用 /#
        mode:"history"
        })

    new Vue({
        // 实例化内使用路由
        router,
        el: '#app',
        template: '<App/>',
        components: { App }
    })

    // 如果在内不写 el: '#app', 可以在尾部加入 .$mount('#app')
    // new Vue({
    //    router,
    //    template: '<App/>',
    //    components: { App }
    //}).$mount("#app")
    ```
    * 在 `App.vue` 内的 `html` 内引入路由模块
        * `<router-view></router-view>`
    * 在 `App.vue` 内的 `html` 内使用路由进行组件跳转
        * `<router-link to="/">Home</router-link>`
        * 用法与 a 标签一致, to 属性与 href 一致, 使用后页面不需要自动刷新就可以显示其他页面
    * 使用 `vue-router` 获取 `http` 请求
        * 在组件内的 `created()` 方法内使用
        ```js
        created(){
            // vue-router 获取数据的方法 - 可获取本地数据及网络数据
            this.$http.get("http://jsonplaceholder.typicode.com/users")
                // es6 的方式 Promise 的方法, 请求成功使用 then 失败使用 catch
                .then((data) => {
                // console.log(data);
                this.users = data.body;
                })
        }
        ```
    * `vue-router` 获取数据后的方法
         * 获取数据后得到 `Response` 
         * 使用 `.属性名` 可以获取到返回来到数据
         * 使用 `slice(start, end)` 可以对数组数据从多少取到多少个数据
    
26. vue 跨域请求
    * 跨域前需先配置 config/indes.js 内的 proxyTable 属性
    ```js
    proxyTable: {
      '/apis': {  //使用"/apis"来代替"http://www.thenewstep.cn/" 
        target: 'http://www.thenewstep.cn/', //源地址 
        changeOrigin: true, //改变源 
        pathRewrite: { 
          '^/apis': '' //路径重写 
          } 
      } 
    }
    ```
    * 跨域测试接口
        * 跨域请求
        * 跨域接口地址: http://www.thenewstep.cn/test/testToken.php
        * 参数: username, password
        * token: "f4c902c9ae5a2a9d8f84868ad064e706"
        * 请求类型: post
        * 请求头: "Content-type":"application/json"

    * 使用 fectch 进行跨域请求
    ```js
    simClick:function(){
        fetch("/apis/test/testToken.php",{
          method: "post",
          headers:{
            "Content-type":"application/json",
            token: "f4c902c9ae5a2a9d8f84868ad064e706"
          },
          body:JSON.stringify({
            username:"juncwang",
            password:"123456"
          })
        })
        .then(result => result.json())
        .then(data => console.log(data))
    }
    ```
    * 使用 axios 进行跨域请求
        * 使用前需安装 `npm install axios`
        * 在 `main.js` 内配置如下
        * `import axios from 'axios'` 全局引入
        * `axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706'` 配置头文件内的 token
        * `axios.defaults.headers.post['Content-type'] = 'application/json'` 配置头文件内的 content-type
        * `Vue.prototype.$axios = axios` 把 axios 给予 vue

    ```js
     this.$axios.post("/apis/test/testToken.php",{
       username:"juncwang",
       password:"123456"
       })
       .then(data => console.log(data))
       // axios 没有 json 方法
    ```
    * axios 其他配置方法
      * 在 main.js 内 配置 `axios.defaults.baseURL = "默认地址", 配置后就不需要再写入地址前缀、直接使用接口名

    * 实例请查看 `26-vue 跨域请求`
    
### 自定义指令

* 全局
```js
// 在 main.js 内添加代码

Vue.directive('指令名称',{
  bind(el,binding,vnode){
    // 表示传入到参数
    if(binding.value == 'wide'){
      // 表示所在到元素
      el.style.maxWidth = '1260px'
    }else if(binding.value == 'narrow'){
      el.style.maxWidth = '560px'
    }
    // 表示属性
    if(binding.arg == 'column'){
      el.style.background = '#6677cc'
      el.style.padding = '20px'
    }
  }
})

// 使用如下
// <元素 v-指令名称:属性="参数值"></元素>
// 注意: 参数如果是字符串, 那么传入是应为 "'字符串参数'"
```

* 局部
```js
// 与 data() 同级属性
directives:{
        'rainbow':{
            bind(el,binding,vnode){
                el.style.color = '#' + Math.random().toString(16).slice(2,8)
            }
        }
    }
```

### 自定义过滤器

* 全局
```js
Vue.filter('过滤器名称', function(value){
  return value.slice(0,100) + '...'
})
// 使用方式: {{ 变量 | 过滤器名称 }}
```

* 局部
```js
// 与 data() 同级属性
filters:{
        "to-uppercase":function(value){
            return value.toUpperCase();
        }
    }
```
