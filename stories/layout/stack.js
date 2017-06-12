// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import { Grid, Layout, Item, utils } from '../../src'
import { WithExtensions, Box, getBoxType } from '../core'

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
        {utils.times(subsections, i =>
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

export default function() {
  const subSections = number('Subsections', 3, { range: true, min: 1, max: 20 })
  const sections = number('Sections', 2, { range: true, min: 2, max: 10 })

  return (
    <WithExtensions notes={notes}>
      {utils.times(sections, index => getSection(index, subSections))}
    </WithExtensions>
  )
}
