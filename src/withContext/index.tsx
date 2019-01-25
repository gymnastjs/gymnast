import * as React from 'react'
import ConfigConsumer from '../configProvider/consumer'
import { ConfigContextType } from '../types'

export default function withContext<Props>(
  Component: React.ComponentType<Props>
) {
  return function WithContext(
    props: Diff<Props, { context: ConfigContextType }>
  ) {
    return (
      <ConfigConsumer>
        {context => <Component {...props as Props} context={context} />}
      </ConfigConsumer>
    )
  }
}
