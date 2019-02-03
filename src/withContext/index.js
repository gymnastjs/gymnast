// @flow
import * as React from 'react'
import ConfigConsumer from '../configProvider/consumer'

export default function withContext(Component: React.ComponentType<*>) {
  // $FlowFixMe
  return React.forwardRef(
    (props: React.ElementProps<typeof Component>, ref: React$ElementRef<*>) => (
      <ConfigConsumer>
        {context => <Component {...props} context={context} ref={ref} />}
      </ConfigConsumer>
    )
  )
}
