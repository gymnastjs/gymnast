import * as React from 'react'
import useGrid from './useGrid'
import { GridProps, GridRef } from './types.d'

const forwardRef = React.forwardRef(function Grid(
  props: JSX.IntrinsicElements['div'] & GridProps & { ref?: GridRef },
  ref: GridRef
) {
  const [shouldShow, gridProps] = useGrid(props)

  return shouldShow ? <div {...gridProps} ref={ref} /> : null
})

forwardRef.displayName = 'Grid'

export default forwardRef
