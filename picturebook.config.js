const projectName = 'gymnast'
const isCIMaster = process.env.CI && process.env.CIRCLE_BRANCH === 'master'
const suffix = isCIMaster ? '_MASTER' : ''

module.exports = {
  entryPoint: 'storybook/index.js',
  markdownFooter: 'storybook/shared/footer.md',
  postcssConfig: 'scripts/postcss.config',
  babelConfig: '.babelrc',
  projectName,
  projectUrl: 'https://github.com/gymnastjs/gymnast',
  storiesUrl:
    'https://github.com/gymnastjs/gymnast/tree/master/storybook/stories/',
  storyPath: 'storybook/stories',
  wrapStory: 'storybook/shared/wrapStory.js',
  browserThreshold: 3.7,
  image: {
    selenium: 'saucelabs',
    username: process.env[`SAUCE_USERNAME${suffix}`],
    accessKey: process.env[`SAUCE_ACCESS_KEY${suffix}`],
    desiredCapabilities: {
      tags: [
        isCIMaster ? projectName : `${projectName}-branch`,
        process.env.CIRCLE_BRANCH || 'local',
      ],
      build: process.env.CIRCLE_BUILD_NUM || 'dev',
    },
  },
}
