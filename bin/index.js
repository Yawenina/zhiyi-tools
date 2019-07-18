#! /usr/bin/env node

const minimist = require('minimist');
const chalk = require('chalk');
const program = require('commander');
const commands = require('../src/commands');
const build = require('../src/build');
const pkg = require('../package');

function runCommands() {
  const argv = minimist(process.argv.slice(2));

  program.version(pkg.version);

  program
    .command('build')
    .description('build all commands')
    .action(() => {
      build();
    });

  Object.values(commands).forEach(command => {
    program
      .command(command.name)
      .description(command.description)
      .action(command.action);
  });

  program
    .arguments('<command>')
    .action(cmd => {
      console.error(chalk.red(`[ERROR]: cannot find command ${cmd}`));
    });

  program.parse(process.argv);
}

runCommands();
