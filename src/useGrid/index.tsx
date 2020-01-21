import * as React from 'react'
import { compact } from 'lodash'
import { combineSpacing, getValues, getValue } from '../utils'
import { GridProps } from '../types'
import { styles, getCol } from './grid.styles'
import useResolution from '../useResolution'
import Context from '../gymnastProvider/context'

const resolutionProperties = [
  'align',
  'direction',
  'justify',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'size',
]

export default function useGrid<A extends {}>(
  props: GridProps & A
): [
  boolean,
  A & { className: string | undefined; style: React.CSSProperties }
] {
  const [
    shouldRender,
    {
      align,
      base,
      className,
      direction,
      justify,
      margin,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      padding,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      size,
      style,
      ...restProps
    },
  ] = useResolution(resolutionProperties, props)

  const context = React.useContext(Context)

  if (!shouldRender) {
    return [false, { style: {}, className, ...(restProps as any) }]
  }
  const {
    gutter,
    verticalGutter,
    base: contextBase,
    spacingAliases,
  } = getValues(context, props)

  const spacing = combineSpacing({
    spacingProps: {
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
    },
    base: contextBase,
    spacingAliases,
    gutter,
    verticalGutter,
  })

  return [
    true,
    {
      style: { ...style, ...spacing },
      className: compact([
        styles.grid,
        getCol(size, getValue(context, 'columns')),
        className,
        align && styles[`${align}Align`],
        justify && styles[`${justify}Justify`],
        direction && styles[`${direction}Direction`],
      ]).join(' '),
      ...(restProps as any),
    },
  ]
}
