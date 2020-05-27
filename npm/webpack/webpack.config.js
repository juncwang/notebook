const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
                    'style-loader',
                    'css-loader'
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
            template: "./src/index.html"
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
        open: true
    }
}