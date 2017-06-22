const { readdirSync } = require('fs')
const { join, parse } = require('path')

const BASE_URL = 'http://127.0.0.1:9001/iframe.html'

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

// TODO: refactor to use existing getName function from storyFolders
function getName(path) {
  const fileName = path.replace(/^.*[\\/]/, '').replace(/\.js$/, '')

  return deKebab(fileName)
}

const stories = readdirSync(join(__dirname, '../../stories'))
  // TODO: refactor file structure layout so that story definitions are isolated to own directory
  // (ie, move core, static, and index.js elsewhere)
  .filter(path => ['grid', 'layout', 'components'].indexOf(path) >= 0)
  .map(folder => join(__dirname, '../../stories', folder))
  .map(path => ({
    kind: getName(parse(path).name),
    storyNames: readdirSync(path)
      .filter(storyPath => storyPath.endsWith('.js'))
      .map(getName),
  }))

const scenarios = stories.reduce((prev, story) => {
  const storyScenarios = story.storyNames.map(name => ({
    label: `${story.kind} | ${name}`,
    url: `${BASE_URL}?selectedKind=${encodeURIComponent(
      story.kind
    )}&selectedStory=${encodeURIComponent(name)}`,
    selectors: ['document'],
    delay: 3000,
    misMatchThreshold: 0.1,
    requireSameDimensions: true,
  }))

  return prev.concat(storyScenarios)
}, [])

module.exports = {
  id: 'storybook_screenshot_test',
  viewports: [
    {
      name: 'test',
      width: 1280,
      height: 768,
    },
  ],
  scenarios,
  paths: {
    bitmaps_reference: 'test/screenshot/backstop_data/bitmaps_reference',
    bitmaps_test: 'test/screenshot/backstop_data/bitmaps_test',
    casper_scripts: 'test/screenshot/backstop_data/casper_scripts',
    html_report: 'test/screenshot/backstop_data/html_report',
    ci_report: 'test/screenshot/backstop_data/ci_report',
  },
  casperFlags: [],
  engine: 'slimerjs',
  debug: true,
}
