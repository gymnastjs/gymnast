// @flow
import React from 'react'
import { Grid, Layout } from '../../src'

export default function Root(props: Grid.Props) {
  return (
    <Layout type={Layout.TYPE.PARENT}>
      <Grid {...props} root />
    </Layout>
  )
}
