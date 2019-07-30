#! /usr/bin/env node

const minimist = require('minimist');
const chalk = require('chalk');
const program = require('commander');
const commands = require('../src/commands');
const build = require('../src/build');
const pkg = require('../package');

function runCommands() {
  program.version(pkg.version);

  program
    .command('build')
    .description('build all commands')
    .action(() => {
      build();
    });

  Object.values(commands).forEach(cmdObj => {
    const { command, description, option = [], action } = cmdObj;
    const currentProgram = program
      .command(command)
      .description(description);

    if (option.length) {
      option.forEach(opt => {
        currentProgram.option(...opt);
      })
    }

    currentProgram.action(action);
  });

  program
    .arguments('<command>')
    .action(cmd => {
      console.error(chalk.red(`[ERROR]: cannot find command ${cmd}`));
    });

  program.parse(process.argv);
}

runCommands();
