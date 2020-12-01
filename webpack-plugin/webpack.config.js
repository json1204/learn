const path = require('path') // 路径处理模块
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') 
// const WebpackPlugin1 = require('./src/plugin/plugin1')
// const WebpackPlugin2 = require('./src/plugin/plugin2')
// const FileListPlugin = require('./src/plugin/FileListPlugin')
// const RemoveCommentPlugin = require('./src/plugin/RemoveCommentPlugin')
const RemoveLogsPlugin = require('./src/plugin/RemoveLogsPlugin')


module.exports = {
  entry: {
    index: path.join(__dirname, '/src/main.js'),
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js'
  },
  mode: 'none',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/index.html'),
    }),
    new CleanWebpackPlugin(), // 所要清理的文件夹名称
    // new WebpackPlugin1({ msg: 'hello world' }),
    // new WebpackPlugin2(),
    // new RemoveCommentPlugin(),
    new RemoveLogsPlugin(),
    // new FileListPlugin({
    //   filename: '_filelist.md'
    // })
  ]
}