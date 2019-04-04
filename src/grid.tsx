import * as React from 'react'
import useGrid from './useGrid'
import { GridProps } from './types.d'

export default React.forwardRef(function Grid(
  props: GridProps & JSX.IntrinsicElements['div'],
  ref: React.RefObject<HTMLDivElement>
) {
  const [shouldShow, gridProps] = useGrid(props)

  return shouldShow ? <div {...gridProps} ref={ref} /> : null
})
