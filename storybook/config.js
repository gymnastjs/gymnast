/* eslint-disable global-require, no-underscore-dangle */
import { configure, setAddon } from '@storybook/react'
import JSXAddon from 'storybook-addon-jsx'

setAddon(JSXAddon)

configure(() => {
  require('../stories/index.js')
}, module)

if (typeof window === 'object') {
  window.__screener_storybook__ = require('@storybook/react').getStorybook()
}

if (typeof window === 'object')
  window.__screener_storybook__ = require('@storybook/react').getStorybook()

if (typeof window === 'object')
  window.__screener_storybook__ = require('@storybook/react').getStorybook()
