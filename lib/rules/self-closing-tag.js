var getTag = require('../get-tag')

var tags = {
  area: true,
  base: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
}

module.exports = function (node, source, warn) {
  if (
    node.tagName &&
    !tags[node.tagName] &&
    node.__location &&
    node.__location.startTag &&
    !node.__location.endTag
  ) {
    var startTag = getTag(node, source, true)
    if (startTag.indexOf('/>') > -1) {
      var msg =
        'Invalid self-closing tag: ' + startTag + '.' +
        ' This will be treated as the starting tag only in HTML5.' +
        ' Use <' + node.tagName + '></' + node.tagName + '> instead.'
      warn(
        msg,
        source,
        node.__location.startTag.line,
        node.__location.startTag.col
      )
    }
  }
}
