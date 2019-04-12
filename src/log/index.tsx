/* eslint-disable no-console */
import { errors } from '../errors'
import { Logger } from '../types'

const logLevels = ['info', 'warn', 'error']
let logIndex = 0

let logger: Logger = console

const log = {
  info: (...args: any[]) => logIndex <= 0 && logger.info(...args),
  warn: (...args: any[]) => logIndex <= 1 && logger.warn(...args),
  error: (...args: any[]) => logIndex <= 2 && logger.error(...args),
  setLevel(level: 'info' | 'warn' | 'error') {
    const index = logLevels.indexOf(level)

    if (index >= 0) {
      logIndex = index
    } else {
      log.error(errors.INVALIDLOGLEVEL, level)
    }
  },
  setLogger(newLogger: Logger) {
    logger = newLogger
  },
}
export default log
