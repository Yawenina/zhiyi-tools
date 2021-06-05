const validateName = require('validate-npm-package-name')
const create = require('./lib/create')
// create('@npm/thingy')

console.log('object :>> ', validateName("@npm/thingy"));