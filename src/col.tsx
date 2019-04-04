import * as React from 'react'
import useGrid from './useGrid'
import { GridProps, OneResolution } from './types'

function mapProps(props: GridProps): OneResolution {
  const defaultProps: OneResolution = {
    marginTop: 0,
    marginRight: 'gutter/2',
    marginBottom: 'verticalGutter',
    marginLeft: 'gutter/2',
  }

  return props.margin !== undefined
    ? props
    : {
        ...defaultProps,
        ...props,
      }
}

export default React.forwardRef(function Col(
  props: GridProps & JSX.IntrinsicElements['div'],
  ref: React.RefObject<HTMLDivElement>
) {
  const [shouldShow, gridProps] = useGrid(props, mapProps)

  return shouldShow ? <div ref={ref} {...gridProps} /> : null
})
