`gutter` is the separation between columns. By default, `<Grid />` component have none. A separation can be manually defined using `margin` or `padding`.

To simplify this task, and in order to ensure consistency, the `<Col />` component defines this separation through `gutter`. With it, the horizontal margin is set as half the gutter size (so that it stacks horizontally) and the vertical one (which falls back to `gutter` if not set) is defined as `verticalGutter * base`, so that it stacks vertically as well.
