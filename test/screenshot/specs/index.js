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
        story.storyNames.map(props => {
          const { folderpath, name, image } = props

          return {
            label: `${folderpath}__${name}`,
            image,
            url: `${BASE_URL}?selectedKind=${encodeURIComponent(
              folderpath
            )}&selectedStory=${encodeURIComponent(name)}`,
          }
        })
      ),
    []
  )

function getBrowserName({ options }) {
  const browserName = options.desiredCapabilities.browserName.toLowerCase()

  switch (browserName) {
    case 'internet explorer':
      return 'ie'
    case 'MicrosoftEdge':
      return 'edge'
    default:
      return browserName
  }
}

module.exports = scenarios.reduce(
  (prev, { label, url, image }) =>
    Object.assign(prev, {
      [label]: browser => {
        process.stdout.write(`loading story at ${url}\n`)
        const browserName = getBrowserName(browser)

        browser.session(session =>
          browser
            .url(url)
            .compareScreenshot(`${label}.png`, image, session, browserName)
            .sauceEnd()
            .end()
        )
      },
    }),
  {}
)
