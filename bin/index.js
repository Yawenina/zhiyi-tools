#! /usr/bin/env node

const minimist = require('minimist');
const chalk = require('chalk');
const debug = require('debug')('zhiyi-tools');
const commands = require('../src/commands');
const build = require('../src/build');

function runCommands() {
  const argv = minimist(process.argv.slice(2));
  const command = commands[argv._[0]];
  if (!command) {
    console.error(`Cannot find command ${command}`);
    return process.exit(0);
  }
  if (argv._[0] === 'build') {
    build();
  }
  debug('start running command: %s', argv._[0]);
  command();
}

runCommands();
