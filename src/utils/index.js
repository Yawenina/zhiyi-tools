
const minimist = require('minimist');
const path = require('path');
const debug = require('debug')('zhiyi-tools');
const chalk = require('chalk');
const cwd = process.cwd();

exports.resolveFileConfig = function resolveFileConfig() {
  const argv = minimist(process.argv.slice(2));
  let input, output;
  if (argv._.length >= 2) {
    input = argv._[0];
    output = argv._[1];
  } else if (argv.config) {
    try {
      const config = require(path.resolve(cwd, argv.config));
      debug('get file config: %o', config);
      input = config.input;
      output = config.output;
    } catch(err) {
      debug('please check your config file');
    }
  }

  if (!input || !output) {
    console.error(chalk.red(`please input ${!input ? 'input' : 'output'} file path.`));
    return process.exit(0);
  }

  return {
    inputPath: path.resolve(cwd, input),
    outputPath: path.resolve(cwd, output)
  }
};
