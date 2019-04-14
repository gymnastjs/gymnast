import * as React from 'react'
import useGrid from './useGrid'
import { GridDivProps, OneResolutionGrid } from './types'

const defaultProps: OneResolutionGrid = {
  marginTop: 0,
  marginRight: 'gutter/2',
  marginBottom: 'verticalGutter',
  marginLeft: 'gutter/2',
}

const forwardRef = React.forwardRef<HTMLDivElement, GridDivProps>(function Col(
  props,
  ref
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

forwardRef.displayName = 'Col'

export default forwardRef
