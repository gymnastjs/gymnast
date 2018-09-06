// @flow
import * as React from 'react'
import type { ConfigContextType } from '../types'
import defaults from '../defaults'

const contextDefaults: ConfigContextType = defaults

const Context = React.createContext(contextDefaults)

export default Context
