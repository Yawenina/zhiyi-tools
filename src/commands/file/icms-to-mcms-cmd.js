/**
 * transform icms i18n data to mcms data format
 * eg: icms data format: { "common.tip.success": "Success" }
 * will be transformed as : [ {
    "id": "common.tip.success",
    "defaultMessage": "Success"
  }] then you can use lzd-plugin-mcms to download translations from mcms
 */

const fs = require('fs-extra');
const util = require('../../utils');

async function icmsToMcms(input, output) {
  const { inputPath, outputPath } = await util.resolveFileInputAndOutput(input, output);
  if (!inputPath || !outputPath) return;

  const message = require(inputPath);
  const result = [];

  Object.keys(message).map(key => {
    result.push({
      id: key,
      defaultMessage: message[key]
    })
  });

  try {
    fs.outputJSON(outputPath, result, { spaces: 2 });
    util.successLog('Successfully created mcms file', 'success');
  } catch {
    util.errorLog('Failed created mcms file', 'error');
  }
}

module.exports = {
  name: 'icms-to-mcms',
  command: 'icms-to-mcms <input> <output>',
  action: icmsToMcms,
  description: 'format icms i18n to mcms format',
};
