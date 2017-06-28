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

/* eslint-disable global-require, no-underscore-dangle */
import { configure, setAddon } from '@storybook/react'
import JSXAddon from 'storybook-addon-jsx'

setAddon(JSXAddon)

configure(() => {
  require('../stories/index.js')
}, module)
