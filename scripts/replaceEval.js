function expressionGlobalPlugin() {
  this.state.module.addVariable(
    'global',
    "(function() { return this; }()) || Function('return this')()"
  )
  return false
}

function parseExpression(parser) {
  parser.plugin('expression global', expressionGlobalPlugin)
}

module.exports = () => ({
  apply(compiler) {
    compiler.plugin('compilation', (compilation, params) => {
      params.normalModuleFactory.plugin('parser', parseExpression)
    })
  },
})
