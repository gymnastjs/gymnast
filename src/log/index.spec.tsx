/* eslint-disable no-console */
import log, { Logger } from './index'

describe('log', () => {
  let logger: Logger

  beforeEach(() => {
    log.setLevel('info')
    log.setLogger(console)

    logger = {
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
    }
  })

  it('should define "info", "warn" and "error" methods', () => {
    expect(log.info).toEqual(jasmine.any(Function))
    expect(log.warn).toEqual(jasmine.any(Function))
    expect(log.error).toEqual(jasmine.any(Function))
  })

  it('should not log "info" when log level is "warn"', () => {
    log.setLevel('warn')
    spyOn(console, 'log')

    log.info('I do nothing!')

    expect(console.log).not.toHaveBeenCalled()
  })

  it('should not log "warn" when log level is "error"', () => {
    log.setLevel('error')
    spyOn(console, 'warn')

    log.warn('I do nothing either!')

    expect(console.warn).not.toHaveBeenCalled()
  })

  it('should allow defining custom loggers', () => {
    log.setLogger(logger)

    log.info('A', 'B', 3)

    expect(logger.info).toHaveBeenCalledWith('A', 'B', 3)
  })

  it('should log an error if the log level is invalid', () => {
    log.setLogger(logger)
    // @ts-ignore
    log.setLevel('incorrect value!')

    expect(logger.error).toHaveBeenCalled()
  })
})
