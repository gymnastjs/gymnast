
import * as React from 'react'
import { Root, Grid, Layout } from 'gymnast'
import { times } from 'lodash'
import { number } from '@storybook/addon-knobs'
import { colors } from '../../shared'
import styles from '../../shared/layout.css'

function getStaticSection(index) {
  return (
    <Layout key={index}>
      <Root>
        <Grid style={colors.colors3} margin="L/2 0">
          <h1>{`Section ${index + 1}`}</h1>
        </Grid>
      </Root>
    </Layout>
  )
}

function getContainerSection(index, subsections) {
  return (
    <Layout key={index} height="parent" overflow="scrollbars">
      <Root align="top">
        {times(subsections, i => (
          <Grid margin="L/2 0" key={i}>
            <h1>SubSection {i + 1}</h1>
          </Grid>
        ))}
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

export default () => {
  const subSections = number('Subsections', 3, { range: true, min: 1, max: 20 })
  const sections = number('Sections', 2, { range: true, min: 2, max: 10 })

  return (
    <Layout height="parent" className={styles.page}>
      {times(sections, index => getSection(index, subSections))}
    </Layout>
  )
}
