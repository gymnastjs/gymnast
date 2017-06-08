// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import WithExtensions from '../withExtensions'
import story from './story'
import Grid from '../../src/grid'
import Layout from '../../src/layout'
import { times } from '../../src/utils'
import { getBoxType } from '../utils'
import Item from '../../src/item'
import Box from '../box'

const notes =
  'A layout component defaults to vertically stacking elements, taking the full width and optionally sizing to fit or stretching elements'
const { AUTO } = Layout.SIZE

function getStaticSection(index) {
  return (
    <Layout size={AUTO} key={index}>
      <Grid root>
        <Grid>
          <Box
            size={12}
            type={getBoxType(index)}
            value={`Section ${index + 1}`}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}

function getContainerSection(index, subsections) {
  return (
    <Layout key={index}>
      <Grid root>
        {times(subsections, i =>
          <Grid key={i}>
            <Item size={12}><h1>SubSection {i + 1}</h1></Item>
          </Grid>
        )}
      </Grid>
    </Layout>
  )
}

function getSection(index, subsections) {
  if (index % 2 === 0) {
    return getStaticSection(index)
  }
  return getContainerSection(index, subsections)
}

story.add('Stack', () => {
  const subSections = number('Subsections', 3, { range: true, min: 1, max: 20 })
  const sections = number('Sections', 2, { range: true, min: 2, max: 10 })

  return (
    <WithExtensions notes={notes}>
      {times(sections, index => getSection(index, subSections))}
    </WithExtensions>
  )
})
