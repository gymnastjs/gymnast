// @flow
import * as React from 'react'
import ConfigConsumer from '../configProvider/consumer'

export default function withContext(Component: React.ComponentType<*>) {
  return function WithContext(props: React.ElementProps<typeof Component>) {
    return (
      <ConfigConsumer>
        {context => <Component {...props} context={context} />}
      </ConfigConsumer>
    )
  }
}
