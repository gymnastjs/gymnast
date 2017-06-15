// @flow
import React from 'react'
import { Grid, Layout } from '../../src'

export default function Root(props: Grid.Props) {
  return (
    <Layout size={Layout.SIZE.STRETCH}>
      <Grid {...props} root />
    </Layout>
  )
}
