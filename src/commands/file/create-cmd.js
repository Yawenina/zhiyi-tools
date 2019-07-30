const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');
const exec = require('child_process').exec;
const config = require('../../config');

async function getFilePath(filename, folderPath) {
  let filePath = path.resolve(folderPath, filename);
  const exists = await fs.pathExists(filePath);

  if (!exists) return Promise.resolve(filePath);

  const { replace } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'replace',
      message: `You already has this file in path ${folderPath}. Do you want to replace it?`,
    }
  ]);

  if (replace) return Promise.resolve(filePath);

  const { filename: newFileName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'filename',
      message: 'Input your new file name'
    }
  ]);
  return Promise.resolve(path.resolve(folderPath, newFileName || filename));
}

async function createFile(filename, options) {
  const filePath = await getFilePath(filename, options.path || config.CREATE_FILE_PATH);
  try {
    await fs.outputFile(filePath, '');
    console.log(chalk.green(`Successfully created file: ${filePath}`));
    if (options.vscode) {
      exec(`code ${filePath}`);
    }
    if (options.webstorm) {
      exec(`webstorm ${filePath}`);
    }
  } catch(err) {
    console.error(`Failed create file ${filename}`)
  };
}

module.exports = {
  name: 'create',
  command: 'create <filename>',
  action: createFile,
  description: 'create file',
  option: [
    ['-p, --path <path>', 'define file path'],
    ['-v, --vscode', 'open with vscode'],
    ['-w, --webstorm', 'open with webstorm']
  ]
};
