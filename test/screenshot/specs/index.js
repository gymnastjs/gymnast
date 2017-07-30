const { flattenDeep } = require('lodash')
const { storyFolders } = require('../../../storybook/shared/storyFolders')

const targetUrlIndex = process.argv.indexOf('--url')

const BASE_URL = process.argv[targetUrlIndex + 1]

function getStories(content) {
  if (content.namepath) {
    return content
  }
  return Object.values(content).map(getStories)
}

const scenarios = Object.keys(storyFolders)
  .map(kind => ({
    kind,
    storyNames: flattenDeep(getStories(storyFolders[kind])),
  }))
  .reduce(
    (prev, story) =>
      prev.concat(
        story.storyNames.map(({ namepath, image }) => ({
          label: `${story.kind}__${namepath}`,
          image,
          url: `${BASE_URL}?selectedKind=%20${encodeURIComponent(
            story.kind
          )}&selectedStory=${encodeURIComponent(namepath)}`,
        }))
      ),
    []
  )

module.exports = scenarios.reduce(
  (prev, { label, url, image }) =>
    Object.assign(prev, {
      [label]: browser => {
        process.stdout.write(`loading story at ${url}\n`)

        browser.session(session =>
          browser
            .url(url)
            .compareScreenshot(`${label}.png`, image, session)
            .sauceEnd()
            .end()
        )
      },
    }),
  {}
)
