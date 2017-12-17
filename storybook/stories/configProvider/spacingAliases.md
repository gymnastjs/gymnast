You can use `ConfigProvider` to set different configuration options. `ConfigProvider` is a pass-through element. So it does not define an additional `Grid` or `Layout` element. This gives you flexibility to decide what the container should be. Note that if you are using React 15.5 or below, you'll have to make sure a single child is passed.

Margins and paddings can be aliased for convenience with the property `spacingAliases`. These values, like all other margins and paddings, are then multiplied by their `base` value (for Grid the default is `24px`).

The default `24px` value for `base` can also be overwritten through the `ConfigProvider`. This example uses configProvider with `base` `8px` and the following `spacingAliases`:

| Alias       | Value | Base | Base x Alias Value |
| ----------- | ----- | ---- | ------------------ |
| XS          | 0.5   | 8    | 4px                |
| S/2         | 0.5   | 8    | 4px                |
| S           | 1     | 8    | 8px                |
| M/2         | 1     | 8    | 8px                |
| M           | 2     | 8    | 16px               |
| L/2         | 1.5   | 8    | 12px               |
| L           | 3     | 8    | 24px               |
| XL/2        | 2     | 8    | 16px               |
| XL          | 4     | 8    | 32px               |
| XXL/2       | 3     | 8    | 24px               |
| XXL         | 6     | 8    | 48px               |

Changing base to `24` changes the spacing values:

| Alias       | Value | Base | Base x Alias Value |
| ----------- | ----- | ---- | ------------------ |
| XS          | 0.5   | 24   | 12px               |
| S/2         | 0.5   | 24   | 12px               |
| S           | 1     | 24   | 24px               |
| M/2         | 1     | 24   | 24px               |
| M           | 2     | 24   | 48px               |
| L/2         | 1.5   | 24   | 36px               |
| L           | 3     | 24   | 72px               |
| XL/2        | 2     | 24   | 48px               |
| XL          | 4     | 24   | 96px               |
| XXL/2       | 3     | 24   | 72px               |
| XXL         | 6     | 24   | 144px              |

Use the knobs to try different `base` values.

There are other parameters that can be customized through `ConfigProvider`. For more information check the [wiki page](https://github.com/obartra/reflex/wiki/ConfigProvider).
