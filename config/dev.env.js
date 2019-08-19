'use strict'
// 此文件下的常量主要用于项目运行时用到全局常量，通过  webpack.DefinePlugin设置 
// webpack4 版本 会自动预设置process.env.NODE_ENV所以不需要手动配置DefinePlugin
// 在webpack 3或者3一下版本需要通过 DefinePlugin设置在运行项目时获取全局常量process.env.NODE_ENV
//const env = require('xxx/xx.js') 
// new webpack.DefinePlugin({
//   'process.env': env
// }),
const merge = require('webpack-merge')
const prodEnv = require('./prod.env') 
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
