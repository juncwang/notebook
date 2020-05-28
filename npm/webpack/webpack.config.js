const { resolve } = require('path')
// html 独立文件插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// css 独立文件插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// css 压缩文件插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 设置 node 的环境变量
// process.env.NODE_ENV = "developement"

module.exports = {
    // 入口文件
    entry: "./src/index",
    // 输出文件
    output: {
        // 输出文件名
        filename: "built.js",
        // 输出文件路径
        path: resolve(__dirname, 'build')
    },
    // loader 配置
    module: {
        rules: [
            {
                // 处理 js 兼容性 babel-loader @babel/preset-env @babel/core
                // 1 基本 js 兼容性处理 -- @babel/preset-env  == 无法对 promise 等新东西进行处理
                // 2 全部 js 兼容性处理 -- @babel/polyfill == 体积太大
                //        * 只需要在相应的 js 代码文件内 import 即可
                // 3 按需兼容性处理: 按需加载 --> core-js
                test: /\.js$/,
                // 不处理第三方包内的代码
                exclude: /node_modules/,
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
                    ]
                }
            },
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
                 * }
                 *
                 * // 在代码中加入 // eslint-disable-next-line 表示下一行不进行规则检查
                 */
                test: /\.js$/,
                // 排除第三方库的代码监测
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 按规则自动修复 eslint 错误
                    fix: true
                }
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
                    esModule: false
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
                    name: '[hash:10].[ext]'
                }
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
            filename: 'css/built.css'
        }), // 使用 css 配置时需要把 css loader 内容进行更改
        // 配置 css 压缩
        new OptimizeCssAssetsWebpackPlugin(),

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
        open: true
    }
}