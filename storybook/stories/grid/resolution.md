`show` allows you to define when a given component is visible based on the screen width.

By default, all components are always rendered. You can modify this behavior by setting any of the following values:

- **small**: -599
- **medium**: 600-899
- **large**: 900-

You can customize these values by modifying `displayAliases` in `ConfigContext`.

Spacing properties (`margin`, `padding` and its variants e.g. `paddingTop`), `size`, `align`, `justify` can take an object as parameter where the keys define for which resolutions it applies. E.g.

```js
<Grid size={{ small: 3, medium: 4, large: 6 }} />
```

To indicate a default value, simply set a `default` key:

```js
<Grid size={{ small: 3, default: 6 }} />
```
