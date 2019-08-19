// 自己打包文件
// 


const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf.js');
const path = require('path') 
// 主要用来实现node.js命令行环境的loading效果，和显示各种状态的图标等
const ora = require('ora');
// 以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除
const rm = require('rimraf');
// chalk 这个包是为了使输出不再单调,添加文字背景什么的,改变字体颜色什么的,
const chalk = require('chalk') 
 
// process.env 属性返回包含用户环境的对象
const spinner = ora('building for production...')
spinner.start() 
// rm 先删除dist文件夹，如果用hash取名时每次打包都会生成不同的文件，所以dist文件夹下面的文件越来越多，需要先删除
rm(path.join(__dirname, '../dist'), err => {
    if (err) throw err;
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
    
        if (err) throw err
    
        console.log('已打包好了，我们做点别的事')
    }) 
}) 

// 没有监听，编译器运行，要比不带编译器的快些
//const compiler = webpack(webpackConfig);  
// compiler.run((err, state) => {
//     if(err) throw err;
//     console.log('打包完毕，编译器运行，要比不带编译器的快些')
// })

// 监听打包，代码更改立即重新打包 
//const compiler = webpack(webpackConfig);  
// const watching = compiler.watch({
//     //watch options
// }, (err, state) => { 
//     // Print watch/build result here...
//     console.log('监视ing')
// })
