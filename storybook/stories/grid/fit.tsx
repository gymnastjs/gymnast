
import * as React from 'react'
import { times } from 'lodash'
import { number } from '@storybook/addon-knobs'
import { Root, Layout, Grid, Col } from 'gymnast'
import { colors } from '../../shared'

type ItemProps = {
  text: string,
}

const Item = ({ text, ...props }: ItemProps) => (
  <Col margin="L/2" {...props}>
    <Grid padding="L/2" style={colors.colors1}>
      {text}
    </Grid>
  </Col>
)

export default () => {
  const autoItems = number('Auto Items', 1, { range: true, min: 0, max: 5 })
  const fitItems = number('Fit Items', 1, { range: true, min: 0, max: 5 })

  return (
    <Layout height="parent">
      <Root>
        <Grid size="fit" justify="center" style={colors.colors2}>
          {times(autoItems, i => (
            <Item key={i} size="auto" text={`Auto ${i + 1}`} />
          ))}
          {times(fitItems, i => (
            <Item key={i} size="fit" text={`Fit ${i + 1}`} />
          ))}
        </Grid>
      </Root>
    </Layout>
  )
}
