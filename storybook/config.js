import { configure, setAddon } from '@storybook/react'
import infoAddon from '@storybook/addon-info'
import './storybook.css'

setAddon(infoAddon)

configure(() => {
  /* eslint-disable global-require */
  require('../stories/index.js')
  /* eslint-enable global-require */
}, module)
