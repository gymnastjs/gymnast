// @flow
import * as React from 'react'
import { number } from '@storybook/addon-knobs'
import { ConfigProvider, Col, Root, Layout } from 'gymnast'
import { colors } from '../../shared'

export default () => {
  const max = number('Max Page Width', 100, { range: true, min: 50, max: 200 })
  const min = number('Min Page Width', 5, { range: true, min: 0, max: 50 })
  const pageMargin = number('Page Margin', 6, { range: true, min: 0, max: 10 })
  const base = number('Base', 8, { range: true, min: 1, max: 24 })

  return (
    <React.Fragment>
      <ConfigProvider
        base={base}
        maxPageWidth={max}
        minPageWidth={min}
        pageMargin={{
          small: pageMargin,
          medium: pageMargin,
          large: pageMargin,
        }}
      >
        <Layout height="parent">
          <Root>
            <Col style={colors.colors1}>Full Width</Col>
          </Root>
        </Layout>
      </ConfigProvider>
      <ConfigProvider
        base={base}
        maxPageWidth="none"
        pageMargin={{
          small: pageMargin,
          medium: pageMargin,
          large: pageMargin,
        }}
      >
        <Layout height="parent">
          <Root marginTop="L">
            <Col style={colors.colors1}>Full Width (No Limit)</Col>
          </Root>
        </Layout>
      </ConfigProvider>
    </React.Fragment>
  )
}
