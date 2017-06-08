// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import WithExtensions from '../withExtensions'
import story from './story'
import Root from '../root'
import Box from '../box'

const notes = 'Showcases the rendering of a pagination component'

story.add('Pagination', () => {
  const size = number('Size', 12, { range: true, min: 7, max: 12 })

  return (
    <WithExtensions notes={notes}>
      <Root size={size}>
        <Box size={1} type="A" value="<" />
        <Box size={1} type="A" value="1" />
        <Box size={1} type="B">...</Box>
        <Box size={1} type="A" value="5" />
        <Box size={1} type="A" value="6" />
        <Box size={1} type="A" value="7" />
        <Box size={1} type="A" value="8" />
        <Box size={1} type="A" value="9" />
        <Box size={1} type="A" value="10" />
        <Box size={1} type="B">...</Box>
        <Box size={1} type="A" value="20" />
        <Box size={1} type="A" value=">" />
      </Root>
    </WithExtensions>
  )
})
