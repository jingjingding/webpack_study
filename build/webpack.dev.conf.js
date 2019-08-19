const path = require('path'); // 核心模块   
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue-loader@15.*之后必须带有VueLoaderPlugin 并单独配置css-loader。
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 打包生成html文件
const webpack = require('webpack') // 核心模块
const env = require('../config/dev.env.js')
const portfinder = require('portfinder') // 解决端口被占用 核心模块
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 第三方模块
const merge = require('webpack-merge') //第三方模块
const baseConfig = require('./webpack.base.conf')
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
console.log(process.env.NODE_ENV)

// 和baseconfig合并
const webpackConfig = merge(baseConfig, { 
    plugins: [
        //允许你创建一个在编译时可以配置的全局常量,在开发模式和发布模式允许不同的行为时非常有用
        // 你可以在开发代码中吗获取process.env常量
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'study webpack', // htmltille
            filename: 'index.html', // 打包后的html文件
            template: 'index.html', // 模板，自己开发的html文件
        }),
        // HotModuleReplacementPlugin配合devserver hot实现热更新
        new webpack.HotModuleReplacementPlugin(), 
    ],
    //  开发环境devserver
    devServer: { 
        // 没有 new HtmlWebpackPlugin时，devserve会启动服务打开contentBase路径下的文件
        // 有了 new HtmlWebpackPlugin时，devserve会启动服务打开打包后的html
        contentBase: path.join(__dirname, '../dist'),
        port: 8080, //端口改为9000
        open:true, // 自动打开浏览器，适合懒人
        hot: true,
        inline: true,
        // publicPath: '/'
    }
})
//获取当前可用的port. (vue-cli配置好了，一旦端口被占用，报错，再次运行时会打开：8080+1,依次类推...8080+n)
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || webpackConfig.devServer.port
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        // publish the new Port, necessary for e2e tests
        process.env.PORT = port
        // add port to devServer config
        webpackConfig.devServer.port = port
  
        // Add FriendlyErrorsPlugin
        webpackConfig.plugins.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${webpackConfig.devServer.host}:${port}`],
          },
          onErrors: true
          ? ''
          : undefined
        }))
  
        resolve(webpackConfig)
      }
    })
  })