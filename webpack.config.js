//导入处理路径模块
const PATH = require('path');

//导入处理html模板插件
const HTML_WEBPACK_PLUGIN = require('html-webpack-plugin');

const MINI_CSS_EXTRACT_PLUGIN=require("mini-css-extract-plugin")
module.exports = {
  //处理模式
  mode: 'development',

  //入口配置
  entry: {
    app: './app/app.js'
  },

  //输出配置
  output: {
    path: PATH.resolve(__dirname + '/public'),
    filename: '[name].js'
  },

  //loader配置
  module: {
    rules: [
      //ulr-loader
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          {loader: 'url-loader', options: {limit: 5 * 1024}}
        ]
      },

      //处理模板图片路径
      {
        test: /\.html?$/,
        use: [
          {loader: 'html-withimg-loader'}
        ]
      },

      //css-loader
      {
        test: /\.css$/,
        use: [
        //   {loader: 'style-loader'},
        {loader:MINI_CSS_EXTRACT_PLUGIN.loader},
          {loader: 'css-loader'}
        ]
      },

      //less-loader
      {
        test: /\.less$/,
        use: [
        //   {loader: 'style-loader'},
        {loader:MINI_CSS_EXTRACT_PLUGIN.loader},

          {loader: 'css-loader'},
          {loader: 'less-loader'}
        ]
      }
    ]
  },

  //插件配置
  plugins: [

    //处理html模板插件
    new HTML_WEBPACK_PLUGIN({
      //模板路径
      template: './app.html',

      //将输出脚添加到body结束标签之前
      inject: 'body',

      //输出模板文件名称
      filename: 'dev.html',

      //压缩配置
      minify: {
        //移除注释
        removeComments: true,

        //移除属性的引号
        removeAttributeQuotes: true,

        //合并空白字符
        collapseWhitespace: true
      }
    }),
    new MINI_CSS_EXTRACT_PLUGIN({
        filename:'[name].css',
    })
  ]
}