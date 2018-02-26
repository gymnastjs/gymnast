// @flow
import { combineSpacing, getValue } from '../utils'
import type { ConfigProviderContext, OneResolution } from '../types'

export default function getCoreStyles(
  props: OneResolution,
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

  const styles = Array.isArray(style)
    ? style.concat(spacing)
    : { ...style, ...spacing }

  return { styles, props: restProps }
}
