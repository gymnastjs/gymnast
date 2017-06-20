// @flow
import React from 'react'
import { times } from 'lodash'
import { number } from '@storybook/addon-knobs'
import { Grid, Layout, Item } from '../../src'
import { Box } from '../core'
import style from './layout.css'

function getStaticSection(index) {
  return (
    <Layout key={index}>
      <Grid root>
        <Grid margin="horizontal">
          <Box size={12} type="C" value={`Section ${index + 1}`} />
        </Grid>
      </Grid>
    </Layout>
  )
}

function getContainerSection(index, subsections) {
  return (
    <Layout key={index} type="parent" overflow="scrollbars">
      <Grid root align="top">
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

export default function() {
  const subSections = number('Subsections', 3, { range: true, min: 1, max: 20 })
  const sections = number('Sections', 2, { range: true, min: 2, max: 10 })

  return (
    <Layout type="parent" className={style.page} style={{ maxHeight: '100%' }}>
      {times(sections, index => getSection(index, subSections))}
    </Layout>
  )
}
