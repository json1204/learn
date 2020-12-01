
// function WebpackPlugin1 (options) {
//   this.options = options
// }

// MYWebpackPlugin.prototype.apply = function (compiler) {
//   compiler.plugin('done', () => {
//     console.log(this.options.msg)
//   })
// }

// module.exports = WebpackPlugin1


class WebpackPlugin1 {
  constructor(options) {
    this.options = options
  }
  apply (compiler) {
    compiler.hooks.done.tap('MYWebpackPlugin', () => {
      console.log(this.options)
    })
  }
}

module.exports = WebpackPlugin1