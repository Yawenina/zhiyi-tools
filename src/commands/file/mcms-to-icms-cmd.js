/**
 * transform mcms data to icms i18n data format
 * eg: mcms data format: {
    "en": {
      "common.tip.success": "Success",
    },
    th": {
      "common.tip.success": "สำเร็จ",
    },
   }
 * will be transformed as :
 * outputPath/en.json: { "common.tip.success": "Success" }
 * outputPath/th.json: { "common.tip.success": "สำเร็จ" }
 */

const fs = require('fs-extra');
const util = require('../../utils');

async function mcmsToIcms(input, output) {
  const { inputPath, outputPath } = await util.resolveFileInputAndOutput(input, output);
  if (!inputPath || !outputPath) return;

  const messages = require(inputPath);
  const writeFiles = Object.keys(messages).map((key) => {
    return fs.outputJSON(`${outputPath}/${key}.json`, messages[key]);
  });

  try {
    await Promise.all(writeFiles);
    util.successLog('Successfully created files');
  } catch (err) {
    util.errorLog('Failed created files');
  }
}

module.exports = {
  name: 'mcms-to-icms <input> <output>',
  command: 'mcms-to-icms',
  action: mcmsToIcms,
  description: 'format mcms i18n to icms format'
};
