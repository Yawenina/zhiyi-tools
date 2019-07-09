const util = require('../../utils');

function mcmsToIcms() {
  const config = util.resolveConfig();
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
  action: mcmsToIcms
};
