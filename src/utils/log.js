// @flow
/* eslint-disable no-console */
import errors from '../errors'

type LogLevels = 'info' | 'warn' | 'error'
const logLevels = ['info', 'warn', 'error']
let logIndex = 0
let logger = console
const log = {}

logLevels.forEach((level, index) => {
  log[level] = (...args: any[]) => {
    if (index >= logIndex) {
      logger[level](...args)
    }
  }
})

log.setLevel = (level: LogLevels) => {
  const index = logLevels.indexOf(level)

  if (index >= 0) {
    logIndex = index
  } else {
    log.error(errors.INVALIDLOGLEVEL, level)
  }
}

log.setLogger = (newLogger: { [LogLevels]: (...args: any[]) => void }) => {
  logger = newLogger
}

export default log
