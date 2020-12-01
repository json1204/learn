const fs = require('fs')

class RemoveLogsPlugin {
  constructor(options) {
    this.options = options
  }

  apply (compiler) {
    console.log(compiler.options.output);
    compiler.hooks.done.tap("RemoveLogs", stats => {
      try {
        this.removeAllLogs(stats);
      } catch (e) {
        console.log(e);
      }
    });

    compiler.hooks.compilation.tap('HelloCompilationPlugin', compilation => {
      compilation.hooks.chunkIds.tap('HelloCompilationPlugin', (c) => {
        this.filename = Array.from(c)[0].name
      });
    });
  };
  removeAllLogs (stats) {
    const { path, filename } = stats.compilation.options.output;
    let filePath = (path + "/" + filename).replace(/\[name\]/g, this.filename);

    try {
      fs.readFile(filePath, "utf8", (err, data) => {
        const rgx = /console.log\(['|"](.*?)['|"]\)/;
        const newData = data.replace(rgx, "");
        if (err) console.log(err);
        fs.writeFile(filePath, newData, function (err) {
          if (err) {
            console.log(err)
          }
          console.log("all logs Removed");
        });
      });
    } catch (e) {
      console.error(e)
    }

  }
}

module.exports = RemoveLogsPlugin
