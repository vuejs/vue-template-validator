var rules = require('./lib/rules')
var codeframe = require('./lib/codeframe')

module.exports = function (node, source) {
  if (typeof node === 'string') {
    source = node
    node = parse(node)
  }
  var warnings = []
  var warn = function () {
    warnings.push(codeframe.apply(null, arguments))
  }
  node.childNodes.forEach(function (node) {
    validate(node, source, warn)
  })
  return warnings
}

function validate (node, source, warn) {
  rules.forEach(function (rule) {
    rule(node, source, warn)
  })
  if (node.childNodes) {
    node.childNodes.forEach(function (node) {
      validate(node, source, warn)
    })
  }
}

function parse (str) {
  return require('parse5').parseFragment(str, { locationInfo: true })
}
