/**
 * 将 commands 里面的文件都引入到 src/commands/index.js 中
 */

const fs = require('fs').promises;
const fsExtra = require('fs-extra');
const debug = require('debug')('zhiyi-tools');
const path = require('path');
const cwd = process.cwd();
const result = [];
const output = {};

function walkFiles(folder) {
  return new Promise((resolve, reject) => {
    fs.readdir(folder)
      .then((files) => {
        const filePromises = files.map(file => {
          const directFilePath = path.resolve(cwd, folder, file);
          return fs.lstat(directFilePath).then(stats => {
            if (stats.isDirectory()) {
              return walkFiles(directFilePath);
            } else {
              if (path.basename(directFilePath).endsWith('-cmd.js')) {
                const content = require(directFilePath);
                result.push(directFilePath);
                output[content.name] = content.action;
              }
            }
          })
        });
        resolve(Promise.all(filePromises));
      })

  });
}

function build() {
  // 遍历文件
  walkFiles(path.resolve(cwd, './src/commands/'))
    .then((res) => {
      console.log('res', res);
      debug(`final commands %s`, result);
      console.log(`generate ${Object.keys(result).length} commands`);
      const content = result.map(commandPath => {
        const path = path.basename(path.relative(path.resolve(cwd, 'src/commands'), commandPath), '.js');
        console.log('path.toString()', path.toString());
        return `
          const ${path.basename(commandPath, '.js')} = require('${path.toString()}');
        `
      });
      fsExtra.outputFile(path.resolve(cwd, 'src/commands/index.js'), `
         ${content.join('\n')};
         
         module.exports = output
      `)
    });
}

module.exports =  {
  name: 'build',
  action: build
}
