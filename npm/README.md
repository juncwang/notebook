### npm-document

* 下载地址 `http://nodejs.cn/`
    * 下载 `nodejs` 安装后, 即可使用 `npm` 命令

* `npm` 的镜像替换成淘宝
    * `npm config set registry http://registry.npm.taobao.org/` 运行命令即可替换

* 安装 `cnpm` 方法
    * `npm install cnpm -g --registry=http://registry.npm.taobao.org/` 运行命令即可替换

* 初始化项目生成配置文件 `package.json`
    * `npm init`

* 安装插件方法
    * `npm install 插件名称`
        * 后面加 `-g` 为全局安装
        * 后面加 `--save-dev` 为项目内安装并且写入 `package.json` 配置文件
            * 写入后项目在其他机器上应用时, 仅需执行 `npm install` 命令即可把配置文件内的所有插件重新安装 

### npm-plugin

* 后台服务
    * `node` 后台服务程序
        * `events` 事件
        * `file` 文件
        * `http` 服务
        * `request` 发起请求
        * `child_process` 多线程
        * `os` 系统
        * `path` 路径
        * `util` 工具包
        * `co` 生成迭代器
        * `node-fetch` node 使用的 fetch
    * `nodemon` 后台服务程序 (调试后台程序使用)
    * `nodejs-websocket` 用于创建webSocket
    * `express` node 的一个网络框架
    * `socket.io` webSocket 框架
    * `koa` express 的一个升级网络框架
    * `body-parser` 解析 body 的工具
    * `connect-multiparty` 上传文件
    * `exceljs` 表格创建
    * `xml2js` 将 xml 转为 js 对象
    * `nodejs-websocket` 后台使用 websocket 
    * `http-server` 轻量级 http 服务
    * `pm2` node 进程管理工具
    * `node-xlsx` 读写 xlsx 文件工具
    
* 后台页面
    * `ejs` ejs 框架
    
* 加密
    * `jsonwebtoken` 生成解析token
    * `jwt-decode` 解析 token
    * `md5` 字符串加密
    * `sha1` 字符串加密

* 数据库
    * `mongoose` 链接 `mongoDB` 数据库使用
    * `mysql` 数据库

* 其他
    * `gravatar` 全球公认头像库

* 前端框架
    * `vuejs` vue 框架 
    * `reactjs` react 框架
        * `axios` 请求工具
        * `router` 路由
        * `vuex` 数据存储
        * `elements-ui` UI 框架
        * `better-scroll` UI 滑动组件
        * `高德地图` 地图工具
        * `three` three 前端3D框架
        * `electron` 将 vue 打包成 exe
        * `echarts` 绘制图表工具
        * `gsap` 动画工具
        * `vue-particles` 粒子背景交互
    * `webpack` 打包测试环境
    
        
* 其他方法
    * 浏览器对象
        * `localStorage` 本地存储对象
            * `setItem('strName', var)` 设置一个储存在本地浏览器的值
        * `WebSocket` 实时通信
            * 初始化 websocket `var ws = new WebSocket('ws:url')`
            * 服务器连接成功事件 `ws.onopen = () => { ... ... }`
            * 向服务器发送数据 `ws.send(data)` data 是需要发送的数据
            * 服务器接收数据事件 `ws.onmessage = (e) => { ... ... }` e.data 是服务器返回的数据
            * 服务器关闭事件 `ws.onclose = () => { ... ... }`
        * `navigator.mediaDevices.getUserMedia(constranints)` 打开摄像头及录音
            * 返回一个 `Promise` 对象
                * 成功调用 `.then( stream => {})` 视频音频流, 给到 video audio 标签的 srcObject 属性上实现播放
                * 失败调用 `.catch( err => {})` 错误信息
            * `constranints` 为一个对象
                * `{audio: true, video: true}` 默认两个都是打开
                * `{video: {width: 1280, height: 720}}` 设置视频的宽高比
            * js 原生导出 csv 文件
            ```js
            // 导出数据表 ====================================================================================
            // 导出csv
            /**
            * @param jsonData `[{},{}]` 具体数据内容 json 数组
            * @param str `参数1名称,参数2名称\n` 表头显示内容用逗号隔开
            * @param fileName 文件名称
            */
            export function exportCSV(jsonData: any[], str: string, fileName: string) {
                //增加\t为了不让表格显示科学计数法或者其他格式
                for (let i = 0; i < jsonData.length; i++) {
                    for (let item in jsonData[i]) {
                        str += `${jsonData[i][item] + '\t'},`;
                    }
                    str += '\n';
                }
                //encodeURIComponent解决中文乱码
                let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
                //通过创建a标签实现
                var link = document.createElement("a");
                link.href = uri;
                //对下载的文件命名
                link.download = fileName + '.csv';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            ```
