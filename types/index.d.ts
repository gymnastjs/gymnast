import * as gymnast from './src/gymnast'

declare module 'gymnast' {
  export = {
    ...gymnast,
    default: gymnast,
  }
}
