### element-ui

* 网址 `http://element-cn.eleme.io/#/zh-CN`

* 安装方式
    * `npm install element-ui -S`

* 使用方式
    * 详见网站组件

##### 为项目添加 element-ui

* `main.js` 中添加以下代码
    * `import ElementUI from 'element-ui'`
    * `import 'element-ui/lib/theme-chalk/index.css'`
    * `Vue.use(ElementUI)`

##### 利用 element-ui 给 axios 拦截器添加动画及提示

```js
import axios from "axios";
import { Loading, Message } from 'element-ui'

// 使用 Element-ui 添加网络请求动画方法
let loading
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '网络请求中, 请等待',
        background: 'rgba(0,0,0,0.5)'
    })
}
function closeLoading(){
    loading.close()
}

// 发出请求时, 对数据进行拦截
axios.interceptors.request.use(
  config => {
      startLoading()
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 获取请求数据时, 对数据进行拦截
axios.interceptors.response.use(
  response => {
    closeLoading()
    Message.success('网络请求成功')
    return response;
  },
  error => {
    closeLoading()
    Message.error('网络请求失败')
    return Promise.reject(error);
  }
);

export default axios;
```