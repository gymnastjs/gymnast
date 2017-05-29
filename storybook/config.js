import { configure } from '@storybook/react'
import './storybook.css'

configure(() => {
  /* eslint-disable global-require */
  require('../stories/index.js')
  /* eslint-enable global-require */
}, module)
