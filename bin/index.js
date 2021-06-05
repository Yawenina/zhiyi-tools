#!/usr/bin/env node

const program = require('commander')
const minimist = require('minimist')
const chalk = require('chalk')

program
  .version(`@zhiyi/tools ${require('../package.json').version}`)
  .usage(`<command> [options]`)

program
  .command('create <app-name>')
  .description('create a new project powered by zhiyi-tools')
  .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')
  .option('-g --git [message]', 'Force git initilization with initial commi message')
  .option('-n --no-git', 'Skip git initilization')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .option('-m, --merge', 'Merge taregt director if it exists')
  .action((name, options) => {
    console.log('name, options :>> ', name, options);
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(chalk.yellow(`\n Info: You provided more than one argument. The first one will be used as the aoo\'s name, the rest are ignored.`))
    }
    if (process.argv.includes('-g') || process.argv.includes('--git')) {
      options.forceGit = true
    }
    // require('../lib/create')(name, options)
  })

program.on('command:*', ([cmd]) => {
  program.outputHelp()
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
  console.log()
  process.exitCode = 1
})

program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`vue <command> --help`)} for detailed usage of givern command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

program.parse(process.argv)