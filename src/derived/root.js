// @flow
import * as React from 'react'
import Grid from '../grid'

export default function Root(props: { [string]: any }) {
  return <Grid {...props} margin={[0, 0.5]} padding={[0, 1]} />
}
