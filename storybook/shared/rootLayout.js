// @flow
import React from 'react'
import { Layout, Root } from 'reflex'
import type { Height } from '../../src/types'

export default function RootLayout({
  height = 'parent',
  ...props
}: {
  height?: Height,
}) {
  return (
    <Layout height={height}>
      <Root {...props} />
    </Layout>
  )
}
