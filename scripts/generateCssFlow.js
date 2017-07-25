const path = require('path')
const fs = require('fs')

const distDir = path.resolve(__dirname, '../dist')

if (!fs.existsSync(distDir)) {
  throw new Error('dist folder not available')
}

const files = fs.readdirSync(distDir)

files.forEach(file => {
  const parsed = path.parse(file)
  if (parsed.name.endsWith('.css')) {
    const fullPath = path.resolve(__dirname, '../dist', file)
    console.log('stubbing css file', fullPath)
    fs.writeFileSync(fullPath, '')
  }
})
