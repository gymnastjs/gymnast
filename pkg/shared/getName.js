function deKebab(text) {
  return text
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map((word = '') => {
      const first = (word[0] || '').toUpperCase()

      return `${first}${word.slice(1)}`
    })
    .join(' ')
}

function getName(path) {
  const fileName = path.replace(/^.*[\\/]/, '').replace(/\.js$/, '')

  return deKebab(fileName)
}

module.exports = {
  getName,
}
