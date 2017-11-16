// @flow
import 'picturebook'
import { initDevMode } from '../src/reflex'

const { toggleColor } = initDevMode({ force: true })

toggleColor(true)
