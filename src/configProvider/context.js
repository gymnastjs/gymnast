// @flow
import * as React from 'react'
import type { ConfigContextType } from '../types'
import defaults from '../defaults'

const Context = React.createContext<ConfigContextType>(defaults)

export default Context
