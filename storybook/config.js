import { configure, setAddon } from '@storybook/react'
import JSXAddon from 'storybook-addon-jsx'

setAddon(JSXAddon)

configure(() => {
  /* eslint-disable global-require */
  require('../stories/index.js')
  /* eslint-enable global-require */
}, module)
