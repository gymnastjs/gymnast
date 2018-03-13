// @flow
import { combineSpacing, getValue } from '../utils'
import type { ConfigProviderContext, OneResolution } from '../types'

export default function getCoreStyles(
  props: $Shape<OneResolution>,
  context: ConfigProviderContext
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
    base: getValue(context, 'base', base),
    spacingAliases: getValue(context, 'spacingAliases'),
  })

  const spacingStyles = { ...style, ...spacing }

  return { ...restProps, style: spacingStyles }
}
