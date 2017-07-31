/* eslint-disable global-require, no-underscore-dangle */

import { configure, setAddon } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import JSXAddon from 'storybook-addon-jsx'

if (
  typeof window === 'object' &&
  window.navigator &&
  /node\.js/i.test(window.navigator.userAgent)
) {
  var addons = require('@storybook/addons').default
  var Channel = require('@storybook/channels').default
  addons.setChannel(
    new Channel({
      transport: {
        setHandler: function() {},
        send: function() {},
      },
    })
  )
}

setOptions({
  name: 'Reflex',
  url: 'https://github.com/obartra/reflex',
  downPanelInRight: true,
  hierarchySeparator: /\./,
})

setAddon(JSXAddon)

configure(() => {
  require('../index.js')
}, module)
