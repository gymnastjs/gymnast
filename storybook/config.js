import { configure } from '@storybook/react'
import './storybook.css'

function loadStories() {
  /* eslint-disable global-require */
  require('../stories/index.js')
  /* eslint-enable global-require */
}

configure(loadStories, module)
