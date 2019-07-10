  const mcmsToIcms = require('./file/mcms-to-icms-cmd.js');
  const icmsToMcms = require('./file/icms-to-mcms-cmd.js');

  module.exports = {
    'mcms-to-icms': mcmsToIcms.action,
    'icms-to-mcms': icmsToMcms.action
  };
  