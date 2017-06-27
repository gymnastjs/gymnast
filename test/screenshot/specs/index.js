const { readdirSync } = require('fs')
const { join, parse } = require('path')
const { getName } = require('../../../getName')

const targetUrlIndex = process.argv.indexOf('--url')

const BASE_URL = process.argv[targetUrlIndex + 1]

const stories = readdirSync(join(__dirname, '../../../stories'))
  .filter(path => ['grid', 'layout', 'components'].indexOf(path) >= 0)
  .map(folder => join(__dirname, '../../../stories', folder))
  .map(path => ({
    kind: getName(parse(path).name),
    storyNames: readdirSync(path)
      .filter(storyPath => storyPath.endsWith('.js'))
      .map(getName),
  }))

const scenarios = stories.reduce((prev, story) => {
  const storyScenarios = story.storyNames.map(name => ({
    label: `${story.kind}__${name}`,
    url: `${BASE_URL}?selectedKind=${encodeURIComponent(
      story.kind
    )}&selectedStory=${encodeURIComponent(name)}`,
  }))

  return prev.concat(storyScenarios)
}, [])

module.exports = scenarios.reduce(
  (prev, { label, url }) =>
    Object.assign({}, prev, {
      [label]: browser => {
        process.stdout.write(`loading story at ${url}\n`)
        browser.url(url).compareScreenshot(`${label}.png`).end()
      },
    }),
  {}
)
