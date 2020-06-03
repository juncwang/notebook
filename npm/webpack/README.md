### 使用 webpack

* 需要安装包
    
    * "webpack" 打包 `可定义到 package.json 中使用 npm run 启动`
    * "webpack-cli" 打包工具
    * "webpack-dev-server" 开发者模式 `可定义到 package.json 中使用 npm run 启动`

    * "file-loader" 解析 file
    * "html-loader" 解析 html
    * "html-webpack-plugin" html 导出插件
    * "url-loader" 解析其他文件

    * "less-loader" 解析 less
    * "css-loader"  解析 css
    * "style-loader" 解析 css less 基础
    * "mini-css-extract-plugin" 单独处理 css 文件插件
    * "postcss-loader": 处理 css 兼容性问题
    * "postcss-preset-env" 处理 css 兼容性问题
    * "optimize-css-assets-webpack-plugin" 压缩 css 插件

    * "eslint" 语法检查
    * "eslint-loader" 解析语法检查
    * "eslint-config-airbnb-base" 代码规范 不包含react
    * "eslint-config-airbnb" airbnb 代码规范 包含react
    * "eslint-plugin-import" 使用时需要用到的插件

    * "@babel/core" 处理 js 兼容性问题
    * "babel-loader 处理 js 兼容性问题
    * "@babel/preset-env" 处理基本兼容性问题
    * "@babel/polyfill" 处理全部兼容性问题
    * "core-js" 按需做 js 兼容性处理

    * "workbox-webpack-plugin" PWA 插件

    * "thread-loader" 多进程打包工具

    * "add-asset-html-webpack-plugin" 引入单独打包出去的内容