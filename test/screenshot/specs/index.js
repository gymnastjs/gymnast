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
            )}&selectedStory=${encodeURIComponent(name)}&isCI`,
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
    case 'microsoftedge':
      return 'edge'
    default:
      return browserName
  }
}

module.exports = {
  test: browser => {
    const browserName = getBrowserName(browser)

    browser.session(session => {
      scenarios
        .reduce(
          (b, { url, label, image }) =>
            b
              .url(url)
              .compareScreenshot(`${label}.png`, image, session, browserName),
          browser
        )
        .sauceEnd()
        .end()
    })
  },
}
