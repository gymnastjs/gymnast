import React from 'react'
import PropType from 'prop-types'
import { boolean, number } from '@storybook/addon-knobs'
import { WithNotes } from '@storybook/addon-notes'
import story from './story'
import Grid from '../../src/grid'
import Box from '../box'
import { ALIGN } from '../../src/values'

const notes =
  'Alignment defaults to top but middle and bottom are also available'

function ReferenceColumn({ height }) {
  return (
    <Box
      size={1}
      type="A"
      value="&nbsp;"
      style={{
        height,
      }}
    />
  )
}

ReferenceColumn.prototype.propTypes = {
  height: PropType.number.isRequired,
}

story.add('Align', () => {
  const stretch = boolean('Stretch height', false)
  const margin = boolean('Include margin', true)
  const height = number('Total height', 300, {
    range: true,
    min: 0,
    max: 500,
    step: 25,
  })

  return (
    <WithNotes notes={notes}>
      <div className="gl-layout-root">
        <div className="gl-layout-content">
          <Grid margin={margin} stretch={stretch}>
            <ReferenceColumn height={height} />
            <Box size={2} type="B" value="TOP" align={ALIGN.TOP} />
            <Box size={2} type="C" value="MIDDLE" align={ALIGN.MIDDLE} />
            <Box size={2} type="D" value="BOTTOM" align={ALIGN.BOTTOM} />
            <Box size={2} type="C" value="MIDDLE" align={ALIGN.MIDDLE} />
            <Box size={2} type="E" value="DEFAULT" />
            <ReferenceColumn height={height} />
          </Grid>
        </div>
      </div>
    </WithNotes>
  )
})
