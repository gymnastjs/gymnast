# Migration Reference from gymnast 16 to 17

Version 17 is a complete rewrite of version 16 with significant breaking changes. Unused components like `<Layout />`, `<Root />`, `<Offset />` and `<Dev />` have been removed and remaining [HOC](https://reactjs.org/docs/higher-order-components.html)'s have been replaced with [React Hooks](https://reactjs.org/docs/hooks-intro.html).

If you prefer to use a HOC, you'll have to create your own but leveraging the new exports make this easier. For instance, former `asGrid` HOC could be reimplemented as:

```js
export default function asGrid(Component, displayName = 'Grid') {
  const forwardRef = React.forwardRef((props, ref) => {
    const [shouldShow, resolvedProps] = useGrid(props)

    return shouldShow ? <Component ref={ref} {...resolvedProps} /> : null
  })

  forwardRef.displayName = displayName

  return forwardRef
}
```

## Grid / Col

### Justify / Align

Values `top` and `left` have been replaced with `start` and `bottom` and `right` have been replaced with `end`.

This is to ensure gymnast API matches flexbox more closely. It also enables defining [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) as either `row` or `column` through the new `direction` property.

If using typescript the errors should be highlighted. If that's not the case you can look for instances of `align=` and `justify=` to ensure they have the updated values set.

The new exported type `AlignValues` is used for both `align` and `justify` properties, matching the [CSS Spec terminology](https://www.w3.org/TR/css-flexbox-1/#alignment). It replaces former `AlignGrid` and `Justify` types.

## GymnastProvider

`ConfigProvider` has been renamed to `GymnastProvider` so that it's clear to which library it belongs to when consumed externally.

GymnastProvider is still optional (only needed when wanting to customize settings globally).

### Fallback Key

The fallback key is used when setting properties for different resolutions. E.g.:

```js
<Grid size={{ small: 3, default: 2 }} />
```

That applies size `2` on all resolutions except on `small` size, where value will be `3`.

In previous versions of gymnast, the key used for the fallback value was customizable through the gymnast provider.

Starting on version 17, that property still exists but is always set to `default`.
