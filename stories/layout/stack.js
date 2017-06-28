// @flow
import React from 'react'
import { times } from 'lodash'
import { number } from '@storybook/addon-knobs'
import { Grid, Layout, Root } from 'reflex'
import style from './layout.css'
import { colors3 } from '../core/stories.css'
import { item, horizontalHalf } from '../core/marginTypes'

function getStaticSection(index) {
  return (
    <Layout key={index}>
      <Root>
        <Grid margin={horizontalHalf}>
          <Grid className={colors3} margin={horizontalHalf}>
            <h1>{`Section ${index + 1}`}</h1>
          </Grid>
        </Grid>
      </Root>
    </Layout>
  )
}

function getContainerSection(index, subsections) {
  return (
    <Layout key={index} type="parent" overflow="scrollbars">
      <Root align="top">
        {times(subsections, i =>
          <Grid key={i}>
            <Grid margin={item} size={12}><h1>SubSection {i + 1}</h1></Grid>
          </Grid>
        )}
      </Root>
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
