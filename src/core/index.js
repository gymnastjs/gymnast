// @flow
import { combineSpacing, getValue, getValues } from '../utils'
import type { ConfigProviderContext, OneResolution } from '../types'

export default function getCoreStyles(
  props: $Shape<OneResolution>,
  context: ConfigProviderContext,
  options?: { useColDefaults?: boolean } = {}
) {
  let defaultColProps

  if (options.useColDefaults && props.margin === undefined) {
    const { gutter, verticalGutter } = getValues(context, props)
    defaultColProps = {
      marginTop: 0,
      marginRight: gutter / 2,
      marginBottom: verticalGutter,
      marginLeft: gutter / 2,
    }
  }

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
  } = { ...defaultColProps, ...props }

  const spacing = combineSpacing({
    spacingProps: {
      ...(options.useColDefaults ? defaultColProps : undefined),
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
