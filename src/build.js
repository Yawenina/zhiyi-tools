/**
 * 将 commands 里面的文件都引入到 src/commands/index.js 中
 */

const fs = require('fs').promises;
const fsExtra = require('fs-extra');
const debug = require('debug')('zhiyi-tools');
const chalk = require('chalk');
const path = require('path');
const cwd = process.cwd();
const camelCase = require('lodash/camelCase');
const result = [];
const output = {};
const moduleOutput = {};

async function walkFiles(folder) {
  const dir = await fs.readdir(folder);
  dir.map(async file => {
    const absolutPath = path.resolve(cwd, folder, file);
    const isDir = await fs.lstat(absolutPath);
    if (isDir) {
      return walkFiles(absolutPath)
    } else {

    }
  });
  return fs.readdir(folder)
    .then((files) => {
      const filePromises = files.map(file => {
        const absolutPath = path.resolve(cwd, folder, file);
        return fs.lstat(absolutPath)
          .then(stats => {
            if (stats.isDirectory()) {
              return walkFiles(absolutPath);
            } else {
              if (path.basename(absolutPath).endsWith('-cmd.js')) {
                const content = require(absolutPath);
                result.push(absolutPath);
                output[content.name] = {
                  action: content.action,
                  path: absolutPath
                };
                moduleOutput[content.name] = camelCase(content.name);
                return content.name;
              }
            }
          })
      });
      return Promise.all(filePromises);
    })
}

function build() {
  // 遍历文件
  walkFiles(path.resolve(cwd, './src/commands/'))
    .then(() => {
      debug(`final commands %s`, result);
      console.log(chalk.green(`generate ${result.length} commands: ${Object.keys(output).join(', ')}`));
      const content = Object.entries(output).map(([key, value]) => {
        const relativePath = path.relative(path.resolve(cwd, 'src/commands'), value.path);
        const pathName = path.basename(relativePath, '.js');
        return `const ${camelCase(key)} = require(\'./${relativePath}\');`.padStart(2);
      });
      fsExtra.outputFile(path.resolve(cwd, 'src/commands/index.js'),
      `  ${content.join('\n  ')}\n
  module.exports = {${Object.entries(moduleOutput).map(([key, value]) => `
    \'${key}\': ${value}`).join(',')
  }
  };
  `, { encoding: 'utf8' })
    });
}

module.exports = build;
