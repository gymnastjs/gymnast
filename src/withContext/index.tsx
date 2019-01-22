import * as React from 'react'
import ConfigConsumer from '../configProvider/consumer'
import { ConfigContextType } from '../types'

export default function withContext<Props>(
  Component: React.ComponentType<Props & { context: ConfigContextType }>
) {
  return function WithContext(props: Props) {
    return <ConfigConsumer>{context => <Component {...props} context={context} />}</ConfigConsumer>
  }
}
