const chalk = require('chalk');
const commands = require('./index');
const config = require('../config');

// TODO get all commands
const SHOW_COMMANDS = {
  config: config,
  commands: `Avaiable Commands: `
}

function showCommands(command, option) {
  const commandsInfo = SHOW_COMMANDS[command];
  if (commandsInfo) {
    console.log(JSON.stringify(commandsInfo, null, 4));
  }
  console.log(`You can show those commands info: ${chalk.green(Object.keys(SHOW_COMMANDS).join(', '))}`);
}

module.exports = {
  name: 'show',
  command: 'show <command>',
  action: showCommands,
  description: 'show tools info'
};
