import * as React from 'react'
import useGrid from './useGrid'
import { GridProps, OneResolutionGrid } from './types'

const defaultProps: OneResolutionGrid = {
  marginTop: 0,
  marginRight: 'gutter/2',
  marginBottom: 'verticalGutter',
  marginLeft: 'gutter/2',
}

export default React.forwardRef(function Col(
  props: GridProps & JSX.IntrinsicElements['div'],
  ref: React.RefObject<HTMLDivElement>
) {
  const colProps =
    props.margin !== undefined
      ? props
      : {
          ...defaultProps,
          ...props,
        }
  const [shouldShow, gridProps] = useGrid(colProps)

  return shouldShow ? <div {...gridProps} ref={ref} /> : null
})
