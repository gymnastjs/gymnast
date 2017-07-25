const path = require('path')
const fs = require('fs')

const distDir = path.resolve(__dirname, '../dist')

function isCSSFile(file) {
  return (
    path.parse(file).name.endsWith('.css') && !fs.lstatSync(file).isDirectory()
  )
}

function getTargetPath(file) {
  return path.resolve(__dirname, '../dist', file)
}

function writeEmptyFile(filePath) {
  return fs.writeFileSync(filePath, '')
}

fs
  .readdirSync(distDir)
  .map(getTargetPath)
  .filter(isCSSFile)
  .forEach(writeEmptyFile)
