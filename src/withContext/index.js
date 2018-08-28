// @flow
import * as React from 'react'
import ConfigContext from '../configContext'

export default function withContext(Component: React.ComponentType<*>) {
  return function WithContext(props: React.ElementProps<typeof Component>) {
    return (
      <ConfigContext.Consumer>
        {context => <Component {...props} context={context} />}
      </ConfigContext.Consumer>
    )
  }
}
