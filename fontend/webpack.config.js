const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const WebpackCleanPlugin = require('webpack-clean-plugin');


module.exports = {
    // 配置环境
    mode:'development',
    // 配置开发环境调试代码
    devtool:'source-map',
    // 入口
    entry:{
        'js/app':'./src/app.js'
    },
    // 出口
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'[name]-[hash:6].js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'my 拉钩 admin',
            template: './public/index.html',
            inject: 'body'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "./public/*.ico",
                    to: "./" ,
                    transformPath(targetPath, absolutePath) {
                        return targetPath.replace('public', '')
                    }
                },
                {
                    from:'./public/libs/',
                    to:path.join(__dirname,'./dist/libs')
                }
            ],
        }),
        new WebpackCleanPlugin()
    ],
    // 配置loader
    module: {
        rules: [{
            test: /\.art$/,
            loader: "art-template-loader"
        },{
            test: /\.css$/,
            loaders:["style-loader","css-loader"]
        }]
    },
    // 配置server,安装wenpack-dev-server
    devServer:{
        contentBase:path.join(__dirname,'./dist'),
        compress:true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
            },
        },
    }
}
