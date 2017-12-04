// @flow
import * as React from 'react'
import { times } from 'lodash'
import { number } from '@storybook/addon-knobs'
import { Col, Grid } from 'reflex'
import { RootLayout } from '../../shared'

type ItemProps = {
  text: string,
}

const Item = ({ text, ...props }: ItemProps) => (
  <Col margin="L/2" {...props}>
    <Grid padding="L/2" dev={1}>
      {text}
    </Grid>
  </Col>
)

export default () => {
  const autoItems = number('Auto Items', 1, { range: true, min: 0, max: 5 })
  const fitItems = number('Fit Items', 1, { range: true, min: 0, max: 5 })

  return (
    <RootLayout>
      <Grid size="fit" justify="center" dev={2}>
        {times(autoItems, i => (
          <Item key={i} size="auto" text={`Auto ${i + 1}`} />
        ))}
        {times(fitItems, i => (
          <Item key={i} size="fit" text={`Fit ${i + 1}`} />
        ))}
      </Grid>
    </RootLayout>
  )
}
