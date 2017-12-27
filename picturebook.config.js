const projectName = 'xflex'
const isCIMaster = process.env.CI && process.env.CIRCLE_BRANCH === 'master'
const suffix = isCIMaster ? '_MASTER' : ''

module.exports = {
  entryPoint: 'storybook/index.js',
  markdownFooter: 'storybook/shared/footer.md',
  postcssConfig: 'scripts/postcss.config',
  babelConfig: '.babelrc',
  projectName,
  projectUrl: 'https://github.com/xflex/xflex',
  storiesUrl:
    'https://github.com/xflex/xflex/tree/master/storybook/stories/',
  storyPath: 'storybook/stories',
  wrapStory: 'storybook/shared/wrapStory.js',
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
