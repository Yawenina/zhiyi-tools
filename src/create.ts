
const path = require('path')
const chalk = require('chalk')
const validateProjectName = require('validate-npm-package-name')

interface IOptions {
  cwd?: string
}

module.exports = async function create(projectName: string, options: IOptions = {}) {
  const cwd = options.cwd || process.cwd()
  const name = projectName === '.' ? path.relative('../', '.') : projectName

  // 1. 检查名字是否合法
  const result = validateProjectName(name)
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors && result.errors.forEach((err: string) => {
      console.error(chalk.red.dim('Error: ') + err)
    })
    result.warnings && result.warnings.forEach((warn: string) => {
      console.error(chalk.red.dim('Warning: ' + warn))
    })
  }
  process.exitCode = 1
  // 2. 检查路径
}
