export function getFirstChildCSSProperty(
  container: Element | null,
  property?: keyof React.CSSProperties
): string | number | undefined {
  if (!container || !container.firstChild) {
    return undefined
  }

  const el: any = container.firstChild
  const styles: any = window.getComputedStyle(el)

  if (!property) {
    /* eslint-disable no-underscore-dangle */
    return styles._values
    /* eslint-enable no-underscore-dangle */
  }

  return styles[property]
}
