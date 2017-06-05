import React from 'react'
import Grid from '../src/grid'
import Layout from '../src/layout'

export default function Root(props) {
  return (
    <Layout size={Layout.SIZE.STRETCH}>
      <Grid {...props} root />
    </Layout>
  )
}
