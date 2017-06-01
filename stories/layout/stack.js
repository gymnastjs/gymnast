import React from 'react'
import { WithNotes } from '@storybook/addon-notes'
import { number } from '@storybook/addon-knobs'
import story from './story'
import Grid from '../../src/grid'
import Layout from '../../src/layout'
import { times } from '../../src/utils'
import { getBoxType } from '../utils'
import Box from '../box'

const notes =
  'A layout component defaults to vertically stacking elements, taking the full width and optionally sizing to fit or stretching elements'
const { AUTO } = Layout.SIZE

function getStaticSection(index) {
  return (
    <Layout size={AUTO} key={index}>
      <Grid margin={false}>
        <Box
          size={12}
          type={getBoxType(index)}
          value={`Section ${index + 1}`}
        />
      </Grid>
    </Layout>
  )
}

function getContainerSection(index, subsections) {
  return (
    <Layout key={index}>
      {times(subsections, i => <div key={i}><h1>SubSection {i + 1}</h1></div>)}
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
    <WithNotes notes={notes}>
      <Layout root>
        {times(sections, index => getSection(index, subSections))}
      </Layout>
    </WithNotes>
  )
})
