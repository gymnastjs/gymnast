import { configure } from '@storybook/react'
import '../stories/stories.css'

configure(() => {
  /* eslint-disable global-require */
  require('../stories/index.js')
  /* eslint-enable global-require */
}, module)
