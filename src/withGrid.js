// @flow
import * as React from 'react'
import { get } from 'lodash'
import { base } from './defaults.json'
import BaseHoc, { type Props as GridProps } from './withBase'
import type { ConfigProviderContext } from './types'
import { ConfigContextPropTypes } from './configProvider'

export default function withGrid(Component: *) {
  const BaseGrid = BaseHoc(Component)

  function Grid(props: GridProps, context: ConfigProviderContext) {
    return <BaseGrid base={get(context, 'xnReflex.base', base)} {...props} />
  }

  Grid.contextTypes = ConfigContextPropTypes

  return Grid
}
