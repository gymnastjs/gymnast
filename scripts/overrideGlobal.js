/* Override "expression global" since its largely unused and it casues CSP violation errors */
function parseExpression(parser) {
  parser.plugin('expression global', () => null)
}

module.exports = () => ({
  apply(compiler) {
    compiler.plugin('compilation', (compilation, params) => {
      params.normalModuleFactory.plugin('parser', parseExpression)
    })
  },
})
