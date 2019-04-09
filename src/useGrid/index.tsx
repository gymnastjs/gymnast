import * as React from 'react'
import { compact } from 'lodash'
import { combineSpacing, getValues, getValue } from '../utils'
import { GridProps, NonGridProps } from '../types'
import { styles, getCol } from './grid.styles'
import useResolution from '../useResolution'
import Context from '../configProvider/context'

const resolutionProperties = ['align', 'justify', 'size']

export default function useGrid<A extends {}>(
  props: GridProps & A
): [boolean, NonGridProps] {
  const [
    shouldRender,
    {
      align,
      className,
      justify,
      size,
      base,
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
      style,
      ...restProps
    },
  ] = useResolution(resolutionProperties, props)
  const context = React.useContext(Context)

  if (!shouldRender) {
    return [false, { style: {}, className, ...restProps }]
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
      ]).join(' '),
      ...restProps,
    },
  ]
}
