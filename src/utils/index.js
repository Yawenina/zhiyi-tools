const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const cwd = process.cwd();

async function resolveFileInputAndOutput(input, output) {
  if (!input || !output) {
    log(`please set ${input ? 'output' : 'input'} path`, 'error');
    return Promise.resolve({});
  }

  const inputPath = path.resolve(cwd, input);
  const outputPath = path.resolve(cwd, output);

  const exists = await fs.exists(inputPath);
  if (!exists) {
    log(`cannot find input file: ${inputPath}`, 'error');
    return Promise.resolve({});
  }

  return Promise.resolve({
    inputPath,
    outputPath
  })
}

function log(str, type) {
  switch (type) {
    case 'error':
      console.error(chalk.red(`[ERROR]: ${str}`));
      break;
    case 'success':
      console.log(chalk.green(`[SUCCESSS]: ${str}`));
      break;
    default:
      console.log(str)
  }
}

exports.resolveFileInputAndOutput = resolveFileInputAndOutput;
exports.log = log;
exports.errorLog = str => log(str, 'error');
exports.successLog = str => log(str, 'success');
