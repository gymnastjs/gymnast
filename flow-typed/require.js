// @flow
type Require = {
  context: (path: string, useSubdirectories?: boolean, regExp?: RegExp) => any,
}

declare var require: Require
