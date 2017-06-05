import React from 'react'
import { WithNotes } from '@storybook/addon-notes'
import { boolean } from '@storybook/addon-knobs'
import story from './story'
import Grid from '../../src/grid'
import Layout from '../../src/layout'
import LoremIpsum from './loremIpsum'
import './holyGrail.css'

const { FIT, AUTO } = Layout.SIZE
const notes =
  'An implementation of the Holy Grail layout using the grid and layout systems. The maximum content width is limited to the page width and the hight is either the page height or content height, whichever is larger'

story.add('Holy Grail', () => {
  const includeText = boolean('Show text', false)

  return (
    <WithNotes notes={notes}>
      <Layout size={FIT} className="holy-grail">
        <Layout size={AUTO} className="header">
          <Grid root>
            <h1>Header</h1>
          </Grid>
        </Layout>
        <Layout>
          <Layout>
            <Grid root>
              <Grid size={2} className="nav"><h2>Nav</h2></Grid>
              <Grid size={8} className="content" align={Grid.ALIGN.TOP}>
                <h2>Content</h2>
                {includeText && <p>{LoremIpsum}</p>}
              </Grid>
              <Grid size={2} className="ads"><h2>Ads</h2></Grid>
            </Grid>
          </Layout>
          <Layout size={AUTO} className="footer">
            <Grid root>
              <h1>Footer</h1>
            </Grid>
          </Layout>
        </Layout>
      </Layout>
    </WithNotes>
  )
})
