/* eslint-disable no-console */
import errors from '../errors'

type Logger = {
  warn: (...args: any[]) => void
  info: (...args: any[]) => void
  error: (...args: any[]) => void
  setLevel: (level: LogLevels) => void
  setLogger: (...args: any[]) => void
}

type LogLevels = 'info' | 'warn' | 'error'
const logLevels: LogLevels[] = ['info', 'warn', 'error']
let logIndex = 0
let logger = console
const log: Partial<Logger> = {}

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
    ;(log as Logger).error(errors.INVALIDLOGLEVEL, level)
  }
}

log.setLogger = (newLogger: { [level: string]: (...args: any[]) => void }) => {
  logger = newLogger as any
}

export default log as Logger
