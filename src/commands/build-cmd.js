/**
 * generate src/commands/index.js by traversing all files under src/commands/ and ends with -cmd.js
 */

const fs = require('fs').promises;
const fsExtra = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const cwd = process.cwd();
const camelCase = require('lodash/camelCase');

const allCommands = {};

async function getCommands(folder) {
  const files = await fs.readdir(folder);
  const filePromises = files.map(async file => {
    const absolutePath = path.resolve(cwd, folder, file);
    const stats = await fs.lstat(absolutePath);
    if (stats.isDirectory()) {
      return getCommands(absolutePath);
    }

    if (path.basename(absolutePath).endsWith('-cmd.js')) {
      const content = require(absolutePath);
      allCommands[content.name] = {
        name: content.name,
        path: absolutePath
      };
    }
    return Promise.resolve();
  });

  return Promise.all(filePromises);
}

async function build() {
  // get all commands files under ./src/commands/
  await getCommands(path.resolve(cwd, './src/commands/'));
  const commandsName = Object.keys(allCommands);
  console.log(chalk.green(`generate ${commandsName.length} commands: ${commandsName.join(', ')}`));

  // generate ./src/commands/index.js
  const imports = Object.entries(allCommands).map(([, value]) => {
    const relativePath = path.relative(path.resolve(cwd, 'src/commands'), value.path);
    return `const ${camelCase(value.name)} = require(\'./${relativePath}\');`;
  });
  const exports = Object.values(allCommands).map(({ name }) => `  ${camelCase(name)}`);
  const content = imports.join('\n') + '\n'
                  + '\nmodule.exports = { \n'
                  + exports.join(',\n') + '\n'
                  + '};'
  fsExtra.outputFile(path.resolve(cwd, 'src/commands/index.js'), content, {encoding: 'utf8'});
}

module.exports = {
  name: 'build',
  command: 'build',
  action: build,
  description: 'build all commands',
};
