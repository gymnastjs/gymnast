import * as React from 'react'
import useGrid from './useGrid'
import { GridDivProps } from './types'

const forwardRef = React.forwardRef<HTMLDivElement, GridDivProps>(function Grid(
  props,
  ref
) {
  const [shouldShow, gridProps] = useGrid(props)

  return shouldShow ? <div {...gridProps} ref={ref} /> : null
})

forwardRef.displayName = 'Grid'

export default forwardRef
