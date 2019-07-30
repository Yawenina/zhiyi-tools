  const config = require('./config-cmd.js');
  const show = require('./show-cmd.js');
  const icmsToMcms = require('./file/icms-to-mcms-cmd.js');
  const create = require('./file/create-cmd.js');
  const mcmsToIcms = require('./file/mcms-to-icms-cmd.js');

  module.exports = {
    'config': config,
    'show': show,
    'icms-to-mcms': icmsToMcms,
    'create': create,
    'mcms-to-icms': mcmsToIcms
  };
  