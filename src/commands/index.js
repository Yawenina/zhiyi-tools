const build = require('./build-cmd.js');
const config = require('./config-cmd.js');
const show = require('./show-cmd.js');
const create = require('./file/create-cmd.js');
const icmsToMcms = require('./file/icms-to-mcms-cmd.js');
const mcmsToIcms = require('./file/mcms-to-icms-cmd.js');

module.exports = { 
    build,
    config,
    show,
    create,
    icmsToMcms,
    mcmsToIcms
};