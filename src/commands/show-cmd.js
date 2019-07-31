const chalk = require('chalk');
const config = require('../config');

const SHOW_COMMANDS = {
  config: config,
};

function showCommands(command, option) {
  const commandsInfo = SHOW_COMMANDS[command];
  if (commandsInfo) {
    console.log(JSON.stringify(commandsInfo, null, 4));
  } else {
    console.log(chalk.red(`[ERROR] cannot find info for ${command}`))
  }
}

module.exports = {
  name: 'show',
  command: 'show <command>',
  action: showCommands,
  description: 'show tools info'
};
