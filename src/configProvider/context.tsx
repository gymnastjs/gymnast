import * as React from 'react'
import { ConfigContextType } from '../types'
import defaults from '../defaults'

export default React.createContext<ConfigContextType>(defaults)
