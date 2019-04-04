import * as React from 'react'
import { compact } from 'lodash'
import { GridProps } from '../types'
import { styles, getCol } from './grid.styles'
import { getValue } from '../utils'
import getCoreStyles from '../core'
import useResolution from '../useResolution'
import Context from '../configProvider/context'

const resolutionProperties = ['align', 'justify', 'size']

export default function useGrid<A extends {}>(
  props: GridProps & A,
  mapDefaultProps: Function = (p: any) => p
): [boolean, { style: React.CSSProperties; className: string } & {}] {
  const [
    shouldRender,
    { align, className, justify, size, ...restProps },
  ] = useResolution(resolutionProperties, props)
  const context = React.useContext(Context)

  if (!shouldRender) {
    return [false, { style: {}, className: '' }]
  }

  const coreStylesProps = getCoreStyles(mapDefaultProps(restProps), context)
  const classes = compact([
    styles.grid,
    getCol(size, getValue(context, 'columns')),
    className,
    align && styles[`${align}Align`],
    justify && styles[`${justify}Justify`],
  ])

  return [true, { ...coreStylesProps, className: classes.join(' ') }]
}
