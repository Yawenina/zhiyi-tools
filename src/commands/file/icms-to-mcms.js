const path = require('path');
const fs = require('fs-extra');
const util = require('../../utils');

function icmsToMcms() {
  const config = util.resolveFileConfig();
  const message = require(config.inputPath);
  const result = [];
  Object.keys(message).map(key => {
    result.push({
      id: key,
      defaultMessage: message[key]
    })
  });
  fs.outputJSON(config.outputPath, result, { spaces: 2 });
}

module.exports = {
  name: 'icms-to-mcms',
  action: icmsToMcms
};
