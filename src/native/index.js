// @flow
import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import asGrid from '../asGrid'
import { rawStyles } from '../asGrid/grid.styles'
import type { GridProps } from '../types'

export { default as ConfigProvider } from '../configProvider'

const { whiteSpace, ...colFit } = rawStyles.colFit
const { boxSizing, ...grid } = rawStyles.grid

const allStyles = StyleSheet.create({
  ...rawStyles,
  grid,
  colFit,
})

const TextView = ({ children, ...props }) => {
  if (typeof children === 'string') {
    return (
      <View {...props}>
        <Text>{children}</Text>
      </View>
    )
  }

  return <View {...props}>{children}</View>
}

export const Grid = (asGrid(TextView, {
  styles: allStyles,
  getStylesProp: ({ classes, styles }) => ({
    style: classes.concat(styles),
  }),
}): React.ComponentType<GridProps>)
