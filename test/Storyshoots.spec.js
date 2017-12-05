import initStoryshots from '@storybook/addon-storyshots'
import './env'

initStoryshots({
  framework: 'react',
  configPath: 'node_modules/picturebook/config',
})
