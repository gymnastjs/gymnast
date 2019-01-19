
import { combineSpacing, getValues } from '../utils'
import { ConfigContextType, OneResolution } from '../types'

export default function getCoreStyles(
  props: $Shape<OneResolution>,
  context: ?ConfigContextType
) {
  const {
    base,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    style,
    ...restProps
  } = props

  const {
    gutter,
    verticalGutter,
    base: contextBase,
    spacingAliases,
  } = getValues(context, props)

  const spacing = combineSpacing({
    spacingProps: {
      margin,
      padding,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    },
    base: base === undefined ? contextBase : base,
    spacingAliases,
    gutter,
    verticalGutter,
  })

  const spacingStyles = { ...style, ...spacing }

  return { ...restProps, style: spacingStyles }
}
