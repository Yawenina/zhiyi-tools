const fs = require('fs-extra');
const path = require('path');
const config = require('../config');
const CONFIG_PATH = path.resolve(__dirname, '../config.json');

function setConfig(key, value) {
  const newConfig = {
    ...config,
    [key]: value
  };
  fs.outputJson(CONFIG_PATH, newConfig, { spaces: 2 });
}

module.exports = {
  name: 'config',
  command: 'config <key> <value>',
  action: setConfig,
  description: 'set config',
};
