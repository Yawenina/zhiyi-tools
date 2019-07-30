const util = require('../../utils');
const fs = require('fs-extra');
const debug = require('debug')('zhiyi-tools');

function mcmsToIcms() {
  const config = util.resolveFileConfig();
  const messages = require(config.inputPath);
  const writeFiles = Object.keys(messages).map((key) => {
    return fs.outputJSON(`${config.outputPath}/${key}.json`, messages[key]);
  });
  Promise.all(writeFiles)
    .then(() => {
      debug('files created!');
    })
    .catch(err => {
      debug('failed:', err);
    })
}

module.exports = {
  name: 'mcms-to-icms',
  command: 'mcms-to-icms',
  action: mcmsToIcms,
  description: 'format mcms i18n to icms format'
};
