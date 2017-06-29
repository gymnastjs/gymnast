import { flattenDeep } from 'lodash'
import { storyFolders } from '../../../storybook/shared/storyFolders'

const targetUrlIndex = process.argv.indexOf('--url')

const BASE_URL = process.argv[targetUrlIndex + 1]

function getStories(content) {
  if (content.namepath) {
    return content.namepath
  }
  return Object.values(content).map(getStories)
}

const stories = Object.keys(storyFolders).map(kind => ({
  kind,
  storyNames: flattenDeep(getStories(storyFolders[kind])),
}))

const scenarios = stories.reduce((prev, story) => {
  const storyScenarios = story.storyNames.map(name => ({
    label: `${story.kind}__${name}`,
    url: `${BASE_URL}?selectedKind=%20${encodeURIComponent(
      story.kind
    )}&selectedStory=${encodeURIComponent(name)}`,
  }))

  return prev.concat(storyScenarios)
}, [])

module.exports = scenarios.reduce(
  (prev, { label, url }) => ({
    ...prev,
    [label]: browser => {
      process.stdout.write(`loading story at ${url}\n`)
      browser.url(url).compareScreenshot(`${label}.png`).end()
    },
  }),
  {}
)
