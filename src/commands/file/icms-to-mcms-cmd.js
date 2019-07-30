const path = require('path');
const fs = require('fs-extra');
const debug = require('debug')('zhiyi-tools');
const util = require('../../utils');

function icmsToMcms() {
  const config = util.resolveFileConfig();
  debug('config file %o', config);
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
  command: 'icms-to-mcms',
  action: icmsToMcms,
  description: 'format icms i18n to mcms format'
};
