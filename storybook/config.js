import { configure } from '@storybook/react'

configure(() => {
  /* eslint-disable global-require */
  require('../stories/index.js')
  /* eslint-enable global-require */
}, module)
