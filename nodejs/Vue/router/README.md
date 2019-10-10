### vue 安装及脚手架环境搭建

* vue 安装及 webpack 安装命令: 
    * `npm install -g vue`
    * `npm install -g vue-cli`
    * `npm install webpack webpack-cli webpack-dev-server -g`

* 新建 vue webpack 项目
    1. 第一种创建工程的命令: `vue init webpack project_name` 
        * 创建完整到项目 - 有 vue 配置文件
        * 安装时的安装提示:
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
    2. 第二种创建工程的命令: `vue init webpack-simple project_name`
        * 快速创建简单项目 - 无 vue 配置文件
        * 安装时的安装提示:
            * 第一个提示: 项目名称
            * 第二个提示: 项目描述
            * 第三个提示: 作者
            * 第四个提示: 执照 (enter)
            * 第五个提示: 是否使用 sass (n)
            * 根据提示执行命令 
                1. `cd pizza-app` 进入创建好的文件夹
                2. `npm install`  执行安装命令
                3. `npm run dev`  运行项目

### vue 安装 router 路由及环境搭建

* vue router 的安装命令:
    * `npm install vue-router --save`

* vue router 配置及使用
    * 首先在 `main.js` 文件内配置
        ```js
        // 引入 vue-router
        import VueRouter from 'vue-router'
        // 引入所需要的组建
        import Home from './components/Home'

        // vue 需要使用 vue-router
        Vue.use(VueRouter)

        // vue-router 跳转组建配置表
        const routes = [
        // path 输出路径 name 跳转路径名称 component 路径下所展示的组建
        { path: "/", name: "homeLink", component: Home },
        // 如果页面没有指向 或
        // 用户输入错误路径, 我们希望让错误路径跳转到我们指定路径上,则加入一下路径配置
        // path 匹配所有路径, redirect 跳转到目标路径
        { path: "*", redirect: "/" }
        ]

        // 配置 vue-router 
        const router = new VueRouter({
        // 将配置表引入
        routes,
        // 访问组建无需 # 标签
        mode: "history"
        })

        new Vue({
        // 使用 vue-router
        router,
        el: '#app',
        render: h => h(App)
        })
        ```
        * 详情请看 `main.js` 文件

    * 在 `App.vue` 文件内的 `template` 标签内使用 `<router-view></router-view>` 就能展示 router

    * 在 `Header.vue` 文件内的 `template` 标签内使用组建跳转 vue-router 替换 `<a></a>` 标签, 并且实现跳转不刷新页面的标签:
        * `<router-link to="/" class="nav-link">主页</router-link>`
        * 此标签只能用于工程内跳转
            * `router-link` 下标签的使用
                * `to`: 表示需要跳转到的组建配置的位置
                    * 使用 `:to` 进行使用可以直接放入变量, 实现动态控制跳转的位置 `:to="varName"`
                    * 使用 `:to` 进行使用可以直接放入路径名称, 实现动态控制跳转的位置 `:to="{name:'pathName'}"`
                * `tag`: 表示在前端看到的标签名称, 如果没有配置则默认为 `<a>` 标签

    * 在 `Home.vue` 文件内的 `script` 内的 `methods` 内 router 方法跳转组建
        ```js
        // 跳转到上一次浏览的页面
        this.$router.go(-1)

        // 跳转到指定的组建
        this.$router.replace('/menu')

        // 指定跳转路由的名字
        this.$router.replace({ name: 'menuLink'})

        // 通过 push 进行跳转
        this.$router.push('/menu')
        this.$router.push({ name: 'menuLink'})
        
        // 通过 push 跳转并传递参数
        this.$router.push({path:'/', query:{alert:'传入的参数信息'}})
        // 在跳转的页面内使用传入的参数
        this.$router.query.alert
        ```
* 二级或多级 router 配置及使用
    * 首先在 `main.js` 文件内配置
        * 引入二级组建 `import Contact from './components/about/Contact'`
        * 在配置列表 `routes` 内选择需要配置二级 router 的配置数据进行子类配置
        ```js
        // 添加二级 router 属性为 children
        // 添加默认的指向组建 redirect
        // 如果有多级可以继续在 子组建配置中加入 children 属性继续添加
        { path: "/about", name: "aboutLink", redirect: "/contact",  component: About, children: [
            { path: "/contact", name: "contactLink", component: Contact }
        ] },
        ```
    * 在 `About.vue` 的 `template` 标签内使用 `<router-view></router-view>` 就能展示二级 router

* router 全局守卫
    * 在 `main.js` 内定义完 router 后使用以下代码
    ```js
    router.beforeEach((to, from, next) => {
        // to 想要去的目标页面 to.path 为字符串目标组建的位置
        // from 从哪个页面进行跳转
        // next 跳转到哪个页面, next() 跳转到目标页面, next('/页面地址') 跳转到指定页面 next(false) 不跳转
        if(to.path == '/login' || to.path == '/register'){
            next()
        }else{
            alert("还没有登录, 请先登录!")
            next('/login')
        }
    })
    ```

* router 后置钩子
    * 在 `main.js` 内定义完 router 后使用一下代码
    ```js
    router.afterEach((to, from) => {
        // to 想要去的目标页面 to.path 为字符串目标组建的位置
        // from 从哪个页面进行跳转
        // 与全局守卫一致, 唯一不同就是无论怎么执行都会跳到目标组建页面
        alert("after each")
    })
    ```

* router 组建独享守卫
    * 在 `main.js` 内 routes 定义 router 配置文件时使用 beforeEnter 属性
    ```js
    { path: "/admin", name: "adminLink", component: Admin, beforeEnter: (to,from,next) => {
        // to 想要去的目标页面 to.path 为字符串目标组建的位置
        // from 从哪个页面进行跳转
        // next 跳转到哪个页面, next() 跳转到目标页面, next('/页面地址') 跳转到指定页面 next(false) 不跳转
        // 使用方法基本与全局守卫一致, 唯一不同的则是此属性只针对添加组建
        alert("非登录状态, 无法进入该页面")
        next("/login")
    }}
    ```

* router 组建内部定义守卫
    * 在 `Admin.vue` 内 `script` 内的 `export default` 内进行定义使用
    ```js
    // 进入组建之前
    beforeRouteEnter: (to, from , next) => {
        // to 想要去的目标页面 to.path 为字符串目标组建的位置
        // from 从哪个页面进行跳转
        // next 跳转到哪个页面, next() 跳转到目标页面, next('/页面地址') 跳转到指定页面 next(false) 不跳转
        // 组建内部守卫 由于生命周期的原因, 拿不到 this 内的属性
        // alert("hello " + this.name)
        // 可以通过使用回调函数的形式去拿到 this 的属性
        next( vm => {
            alert("hello " + vm.name)
        })
    }

    // 离开组建之前
    beforeRouteLeave: (to, from, next) => {
        // to 想要去的目标页面 to.path 为字符串目标组建的位置
        // from 从哪个页面进行跳转
        // next 跳转到哪个页面, next() 跳转到目标页面, next('/页面地址') 跳转到指定页面 next(false) 不跳转
        // 使用选择提示框让用户选择是否离开
        if (confirm("确定离开吗?") == true) {
            // 表示离开到目标页面
            next()
        } else {
            // 表示留在此页面
            next(false)
        }
    }
    ```

    * router 配置组建地址抽离
        * 新建文件 `routes.js`
        * 把 `main.js` 内配置的 `const routes` 内容及所需文件的倒入移动到 `routes.js` 内
        * 在 `routes.js` 内把 `const routes` 使用 `export` 暴露出来
            * `export const routes`
        * 在 `main.js` 把 `routes.js` 引入
            * `import { routes } from "./routes"`

    * router 组建复用
        * 在 `routes.js` 内把 `Home` 的配置修改为以下
            ```js
            // component 改为 components
            { path: "/", name: "homeLink", components: {
                default: Home,
                定义其他组建到名称
                'orderingGuide': OrderingGuide,
                'delivery': Delivery,
                'history': History
            } }
            ```
        * 在 `App.vue` 文件内使用 `<router-view name="components内定义到名称"></router-view>` 进行使用

    * router 滑块的控制
        * 在 `main.js` 内配置 router 时:
        ```js
        const router = new VueRouter({
            routes,
            mode: "history",
            // 控制滚动条方法
            scrollBehavior:function(to, from, savedPostion){
                // to 去到哪个页面
                // from 来自哪个页面的请求
                // savedPostion 记录上一次的滚动条位置信息 x, y  

                // 滑块到 y 轴 100 位置的地方
                // return { x: 0, y: 100 }

                // 滑块到第一个 btn 到位置
                // return { selector: '.btn' }

                // 滑块到上一个记录点的位置, 需要使用浏览器返回建使用
                if(savedPostion){
                    return savedPostion
                }else{
                    return { x:0, y:0 }
                }
            }
        })
        ```
        
### 自定义路由路径
* 定义方式
   * `{path: '/blog/:id', component: SingleBlog}` id 为须传入路径到值(可以是其他变量名)
* 链接传参
   * `<router-link v-bind:to="'/blog/' + id"></router-link>` 将 id 传入路径
* 页面获取 id 方式
   * `this.$route.params.id` 通过 route.params 获取参数值
   
   
### params传递参数
注：使用params传参只能使用name进行引入
```js
使用params传参
//params传参 使用name
this.$router.push({
  name:'second',
  params: {
    id:'20180822',
     name: 'query'
  }
})

//params接收参数
this.id = this.$route.params.id ;
this.name = this.$route.params.name ;

//路由

{
path: '/second/:id/:name',
name: 'second',
component: () => import('@/view/second')
}
```

### query传递参数
我看了很多人都说query传参要用path来引入，params传参要用name来引入，只是我测试了一下，query使用name来引入也可以传参，使用path也可以。如果有人知道原因可以告诉我一下，谢谢！
```js
//query传参，使用name跳转
this.$router.push({
    name:'second',
    query: {
        queryId:'20180822',
        queryName: 'query'
    }
})

//query传参，使用path跳转
this.$router.push({
    path:'second',
    query: {
        queryId:'20180822',
        queryName: 'query'
    }
})

//query传参接收
this.queryName = this.$route.query.queryName;
this.queryId = this.$route.query.queryId;
```
