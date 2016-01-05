var getTag = require('../get-tag')
var hyphenateRE = require('../hyphenate').hyphenateRE
var hyphenate = require('../hyphenate').hyphenate

module.exports = function (node, source, warn) {
  if (!node.__location.attrs) {
    return
  }
  var rawTag = getTag(node, source, true) // raw
  if (hyphenateRE.test(rawTag)) {
    Object.keys(node.__location.attrs).forEach(function (name) {
      var loc = node.__location.attrs[name]
      var rawAttr = source.slice(loc.startOffset, loc.endOffset)
      var split = rawAttr.split('=')
      var rawName = split[0].trim()
      if (hyphenateRE.test(rawName)) {
        var hyphenated = hyphenate(rawName) + '=' + split[1]
        warn(
          'Found camelCase attribute: ' + rawAttr + '. ' +
          'HTML is case-insensitive. Use ' + hyphenated + ' instead. ' +
          'Vue will automatically interpret it as camelCase in JavaScript.',
          source,
          loc.line,
          loc.col
        )
      }
    })
  }
}
