declare module 'require-context' {
  function requireContext(
    directory: string,
    recursive?: boolean,
    regExp?: RegExp
  ): any

  export = requireContext
}
