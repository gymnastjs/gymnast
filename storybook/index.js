// @flow
import '../pkg'
import { initDevMode } from '../src/reflex'

const { toggleColor } = initDevMode({ force: true })

toggleColor(true)
