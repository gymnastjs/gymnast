You can use `ConfigProvider` to set margins and paddings with convenient aliases. `ConfigProvider` is a pass-through element, it does not define an additional `Grid` or `Layoyut` element. This gives you flexibility to decide what the container should be. If you are using React 15.5 or below, you'll have to make sure a single child is passed.

Note that these values, like all other margins and paddings are multiplied by their `base` value (for Grid the default is `8px`).

For example:

| Alias | Value | Base x Alias Value |
| ----- | ----- | ------------------ |
| XS    | 0.5   | 4px                |
| S/2   | 0.5   | 4px                |
| S     | 1     | 8px                |
| M/2   | 1     | 8px                |
| M     | 2     | 16px               |
| L/2   | 1.5   | 12px               |
| L     | 3     | 24px               |
| XL/2  | 2     | 16px               |
| XL    | 4     | 32px               |
| XXL/2 | 3     | 24px               |
| XXL   | 6     | 48px               |
