// @flow
import React from 'react'
import { Layout, Root } from 'reflex'

export default function RootLayout({
  type = 'parent',
  ...props
}: {
  type?: string,
}) {
  return (
    <Layout type={type}>
      <Root {...props} />
    </Layout>
  )
}
