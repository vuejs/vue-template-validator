var chalk = require('chalk')

/**
 * Transform raw warning messages into codeframe output.
 */

module.exports = function (msg, source, line, col) {
  var output = '\n'
  if (line != null && col != null) {
    var lines = source
      .split(/\r?\n/g)
      .slice(line - 2, line + 1)
      .map(function (lineText, i) {
        if (i === 1) lineText = chalk.yellow(lineText)
        return '  ' + (line - 1 + i) + ' | ' + lineText
      })
    // add carret
    var carret = '    | ' + pad(col - 1) + chalk.yellow('^')
    lines.splice(2, 0, carret)
    output += chalk.gray(lines.join('\n'))
  }
  return output + chalk.red('\n\n  ' + msg + '\n')
}

function pad (n) {
  var res = ''
  while (n--) {
    res += ' '
  }
  return res
}
