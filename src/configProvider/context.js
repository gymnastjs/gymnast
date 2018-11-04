// @flow
import * as React from 'react'
import type { ConfigContextType } from '../types'
import defaults from '../defaults'

export default React.createContext<ConfigContextType>(defaults)
