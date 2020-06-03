const {resolve} = require('path')
// html 独立文件插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// css 独立文件插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// css 压缩文件插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// PWA 渐进式网络开发应用程序 离线加载
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

// webpack 插件
const webpack = require("webpack")
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

// 设置 node 的环境变量
// process.env.NODE_ENV = "developement"

/**
 * 在 package.json 中配置
 * "sideEffects": false 所有代码都没有副作用 (都可以进行 tree shaking)
 * 问题是 会把引入的 css等其他文件 去掉
 *
 * 修改 -- 过滤时会忽略的文件
 * "sideEffects": ["*.css"]
 */


// js 使用动态导入 单独引入会被 optimization 单独打包
// webpackChunkName 打包后的文件名
// import (/* webpackChunkName: 'test' */'./test') 懒加载
// import (/* webpackChunkName: 'test', webpackPrefetch: true */'./test') 预加载
//      .then(({methodName}) => {
//          methodeName(parame)
//      })

module.exports = {
    // 单入口文件 -- 数组第二个 html 文件是为了支持 HMR 功能开启后更新 html 不更新问题
    entry: ['./ser/js/index.js', './src/index.html'],
    // 多入口文件
    // entry: {
    //   main: './src/js/index.js',
    //   test: './src/js/test.js'
    // },
    // 输出文件
    output: {
        // 输出文件名
        // name 文件本来的名字
        // contenthash 根据文件内容生成 hash
        filename: "js/[name].[contenthash:10].js",
        // 输出文件路径
        path: resolve(__dirname, 'build')
    },
    // loader 配置
    module: {
        rules: [
            {
                // 语法检查 eslint-loader eslint
                // 设置检查规则
                // eslint-config-airbnb 包含 react
                // eslint-config-airbnb-base 不包含 react
                // 以上需要 eslint-plugin-import 库
                /**
                 * // package.json 添加一个对象
                 * "eslintConfig": {
                 *      "extends": "airbnb-base"
                 *      "extends": "airbnb" 如果是需要包含 react 就用这个
                 *      "env": {
                 *          // 支持浏览器全局变量 PWA 需要
                 *          "browser": true
                 *      }
                 * }
                 *
                 * // 在代码中加入 // eslint-disable-next-line 表示下一行不进行规则检查
                 */
                test: /\.js$/,
                // 排除第三方库的代码监测
                exclude: /node_modules/,
                // 优先执行 语法监测可能会与兼容性发生冲突，所以需要优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    // 按规则自动修复 eslint 错误
                    fix: true
                }
            },
            {
                // 以下 loader 只会匹配一个 -- 提供性能
                // 注意 不能有两个配置处理同一个类型文件
                // 所以需要把 eslint-loader 拿到外层去
                oneOf: [
                    {
                        // 处理 js 兼容性 babel-loader @babel/preset-env @babel/core
                        // 1 基本 js 兼容性处理 -- @babel/preset-env  == 无法对 promise 等新东西进行处理
                        // 2 全部 js 兼容性处理 -- @babel/polyfill == 体积太大
                        //        * 只需要在相应的 js 代码文件内 import 即可
                        // 3 按需兼容性处理: 按需加载 --> core-js
                        test: /\.js$/,
                        // 不处理第三方包内的代码
                        exclude: /node_modules/,
                        use: [
                            // 开启多进程打包
                            {
                                loader: 'thread-loader',
                                // 可以不加
                                options: {
                                    workers: 2 // 进程2个
                                }
                            },
                            {
                                loader: 'babel-loader',
                                // 前两中 1 + 2 适用
                                // options: {
                                //     // 预设 指示 babel 做什么兼容处理
                                //     presets: ['@babel/preset-env']
                                // }
                                // 第三种按需处理兼容性问题 1 + 3
                                options: {
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                // 按需加载
                                                useBuiltIns: 'usage',
                                                // 指定 core-js 版本
                                                corejs: {
                                                    version: 3
                                                },
                                                // 指定具体的兼容性做到哪个浏览器版本
                                                targets: {
                                                    chrome: '60',
                                                    firefox: '60',
                                                    ie: '9',
                                                    safari: '10',
                                                    edge: '17'
                                                }
                                            }
                                        ]
                                    ],
                                    // 开启 babel 缓存
                                    // 第二次构建时, 读取之前缓存
                                    cacheDirectory: true
                                }
                            }
                        ],
                    },
                    {
                        // 处理 less 资源
                        // 文件类型
                        test: /\.less$/,
                        // 使用解析器
                        use: [
                            'style-loader',
                            'css-loader',
                            'less-loader'
                        ]
                    },
                    {
                        // 处理 css 资源
                        test: /\.css$/,
                        use: [
                            // 该 loader 把 css 放入 js 中 (css 与下 loader 二选一)
                            // 'style-loader',
                            // 提取 js 中的 css 成单独文件 (css 与上 loader 二选一)
                            MiniCssExtractPlugin.loader,
                            // 解析 css 文件
                            'css-loader',
                            // 使用 postcss-loader 加载 提高样式兼容性
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: () => [
                                        // 使用 postcss 插件
                                        // 帮助 browserslist 里面的配置, 通过配置加载指定兼容性样式
                                        /**
                                         * // package.json 添加一个对象
                                         * "browserslist"": {
                                         *     // 开发环境配置
                                         *     // 需要设置 node 环境变量: process.env.NODE_ENV = developement 才会使用开发模式
                                         *     "development": [
                                         *          // 兼容最新的 浏览器 版本
                                         *          "last 1 chrome version",
                                         *          "last 1 firefox version",
                                         *          "last 1 safari version"
                                         *     ],
                                         *     // 生成环境配置
                                         *     // 默认使用生成配置
                                         *     "production": [
                                         *          // 大于 99.8% 的浏览器
                                         *          ">0.01%",
                                         *          // 不需要 ie10 之内已经没人用的浏览器兼容
                                         *          "not dead",
                                         *          // 不需要 op_mini 所有版本的浏览器兼容
                                         *          "not op_mini all"
                                         *     ]
                                         * }
                                         */
                                        require('postcss-preset-env')()
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        // 处理 图片 资源
                        test: /\.(jpg|png|gif)$/,
                        loader: 'url-loader',
                        // 资源参数
                        options: {
                            // 8 kb 以下图片处理为 base64
                            limit: 8 * 1024,
                            // 生成文件名为 hash 文件前 10 位 后缀名保留
                            name: '[hash:10].[ext]',
                            // 图片文件关闭 es6 模块化
                            esModule: false,
                            // 输出路径
                            outputPath: 'imgs'
                        }
                    },
                    {
                        // 处理 html 嵌套图片资源
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        // 排除掉以下资源的其他资源
                        exclude: /\.(js|less|css|jpg|png|gif|html)$/,
                        loader: 'file-loader',
                        options: {
                            name: '[hash:10].[ext]',
                            outputPath: 'media'
                        }
                    }
                ]
            }
        ]
    },
    // 插件
    plugins: [
        // 配置 html 输出
        new HtmlWebpackPlugin({
            // 模板文件路径
            template: "./src/index.html",
            // 压缩 html 代码
            minify: {
                // 移出折叠结构
                collapseWhitespace: true,
                // 移出注释
                removeComments: true,
            }
        }),
        // 配置 css 输出
        new MiniCssExtractPlugin({
            // 文件输出路径
            filename: 'css/built.[contenthash:10].css'
        }), // 使用 css 配置时需要把 css loader 内容进行更改
        // 配置 css 压缩
        new OptimizeCssAssetsWebpackPlugin(),
        // 配置 PWA
        new WorkboxWebpackPlugin.GenerateSW({
            // 帮助 serviceworker 快速启动
            // 删除旧的 serviceworker
            // 生成一个 serviceworker 配置文件
            clientsClaim: true,
            skipWaiting: true
            // 在入口文件 js 中配置
            /**
             * if('serviceWorker' in navigator) {
             *     window.addEventListener('load', () => {
             *         navigator.serviceWorker
             *              .register('/service-worker.js')
             *              .then(() => console.log('sw注册成功'))
             *              .catch(() => console.log('sw注册失败'))
             *     })
             * }
             *
             * SW 代码必须运行在服务器上
             * --> nodejs
             * -->
             *      npm i serve -g
             *      serve -s build 启动服务器, 将 build 目录下所有资源作为静态资源暴露出去
             */
        }),
        // 告诉 webpack 哪些库不参与打包, 同时使用时的名称也得变~
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json')
        }),
        // 将某个文件打包输出出去, 并在html中自动引入该资源
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js')
        })

    ],
    // 模式
    mode: "development", // 'development' or 'production'
    // 开发者配置
    devServer: {
        // 输出路径
        contentBase: resolve(__dirname, 'build'),
        // 代码压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true,
        // 开启 HMR 功能, 针对 css 单个文件进行重新更新, 需要使用 style-loader
        // 因此 开发环境使用 style-loader 生成环境用 MiniCssExtractPlugin.loader
        hot: true,
        // 如果针对 分入口 js 文件需要加入以下代码在 js 中
        // if(module.hot) {
        //     module.hot.accept( './print.js', () => {
        //         print()
        //     })
        // }
    },
    // 调试使用 source-map :提供源代码到构建后代码映射技术, 通过构建后代码找到源代码错误
    devtool: "source-map",
    /**
     * source-map: 生成一个外联的 map 映射文件
     *      错误代码的信息 和 源代码的错误位置
     * inline-source-map: 在输出代码中生成一个内联的 map 映射文件
     *      错误代码的信息 和 源代码的错误位置
     *      只生成一个内联
     * hidden-source-map: 生成一个外联的 map 映射文件
     *      错误代码的信息
     * eval-source-map: 在输出代码中生成一个内联的 map 映射文件
     *      错误代码的信息 和 源代码的错误位置 加 hash 值
     *      每个文件都生成一个内联
     * nosources-source-map: 生成一个外联的 map 映射文件
     *      错误代码的信息
     * cheap-source-map: 生成一个外联的 map 映射文件
     *      错误代码的信息 和 源代码的错误位置 只到行不到具体位置
     * cheap-module-source-map: 生成一个外联的 map 映射文件
     *      错误代码的信息 和 源代码的错误位置
     *      会将 loader 的 source map 加入
     *
     * 开发环境
     * 调整最快
     * eval-cheap-source-map
     * eval-source-map
     * 调试最友好
     * source-map
     * cheap-module-source-map
     * cheap-source-map
     * 一般开发环境使用 --> eval-source-map | eval-cheap-module-source-map
     *
     * 生成环境
     * 隐藏源代码
     * nosources-source-map 全部隐藏
     * hidden-source-map 只隐藏源代码, 会提示构建后代码错误
     * 一般使用 source-map | cheap-module-source-map
     */

    // 可以将 node_modules 中代码单独打包一个 chunk 最终输出
    // optimization: {
    //     splitChunks: {
    //         chunks: "all"
    //     }
    // },
    // 打包时忽略第三方库
    // externals: {
    //     // 忽略库名 -- npm 包名
    //     jquery: 'jQuery'
    // }
}