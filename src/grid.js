// @flow
import React from 'react'
import Base from './base'
import type { SpacingValues, Spacing } from './types'
import { combineSpacing } from './utils'

type Props = {
  margin?: Spacing,
  padding?: Spacing,
  style?: { [string]: string | number },
  marginTop?: SpacingValues,
  marginRight?: SpacingValues,
  marginBottom?: SpacingValues,
  marginLeft?: SpacingValues,
  paddingTop?: SpacingValues,
  paddingRight?: SpacingValues,
  paddingBottom?: SpacingValues,
  paddingLeft?: SpacingValues,
}

export default function Grid({
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  style,
  ...props
}: Props) {
  return (
    <Base
      {...props}
      style={{
        ...style,
        ...combineSpacing({
          margin,
          padding,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
        }),
      }}
    />
  )
}
