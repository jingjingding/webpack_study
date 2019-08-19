// 不管是npm run dev 还是npm run build都会打包，只不过本地运行打包的文件保存在内存中，看不到
// webpack 4
// 1、webpack 4新增mode属性，支持零配置也能打包
// 2、mode有三个参数production，development，none，前两个是有预设的插件，
// 而最后一个则是什么都没有，也就是说设置为none的话，webpack就是最初的样子，无任何预设，需要从无到有开始配置。
// 3、mode 没有被配置的换默认是production
// 4、development 模式下自动预设
//    1）devtool: 'eval'   此选项控制是否生成，以及如何生成 source map。
//    2) plugins: [
//         new webpack.NamedModulesPlugin(),   给打包的模块添加姓名
//         new webpack.NamedChunksPlugin(),    自定义chunks,解决重名问题
//         new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
//       ]
// 5、production 模式下自动预设
//    1） plugins: [
//          new UglifyJsPlugin(/* ... */),  混淆压缩js代码，让别人看不懂也可以不用引入插件直接optimization:{minimize: true,},加快打包速度除了第一次
//          new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
//          new webpack.optimize.ModuleConcatenationPlugin(),
//          new webpack.NoEmitOnErrorsPlugin()   防止程序出错，就是有错误也会继续编译
//        ]
const path = require('path'); // 内置模块   
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue-loader@15.*之后必须带有VueLoaderPlugin 并单独配置css-loader。
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 打包生成html文件
const webpack = require('webpack')
const env = require('../config/dev.env.js')
const config = require('../config')
function resolve (dir) {
    return path.join(__dirname, '..', dir)
  }
console.log(process.env.NODE_ENV)
module.exports = {
    // mode: 'production',
    context: path.resolve(__dirname, '../'),

    // 要用webpack处理的文件入口
    // 每个html页面都有一个入口，单页面应用就一个入口
    // 如果传入一个字符串或字符串数组，chunk 会被命名为 main。
    //如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。
    entry: {
        index: './src/main.js', 
    }, 
    resolve: { 
        //扩展名为.js,.vue,.json的可以忽略，如 import App from './app'，先在当前目录中找app.js，没有再找app.vue，没找到，再找.json，如果还没找到，报错
        extensions: ['.js', '.vue', '.json'], 
        alias: {
            // 别名，这是一个正则的写法，表示以vue结尾的，如import Vue from 'vue' 表示 import Vue from 'vue/dist/vue.esm.js'
            // 解决路由和mian文件里引用给的vue不一样产生报错 
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    // devtool: 'inline-source-map', // 追踪错误
    // webpack处理完文件吐出的位置
    output: {
        filename: '[name].js',
        // path 打包后文件存放路径必须时绝对路径
        path: path.resolve(__dirname, '../dist'), 
        // 打包后引用文件路径
        publicPath: '/', // 开发环境需要设置成/  生产环境需要时'./'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                loader: "vue-style-loader!css-loader", 
            }
        ]
    }, 
}