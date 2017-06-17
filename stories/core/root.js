// @flow
import React from 'react'
import { Grid, Layout } from '../../src'

export default function Root(props: Grid.Props) {
  return (
    <Layout type="parent">
      <Grid {...props} root />
    </Layout>
  )
}
