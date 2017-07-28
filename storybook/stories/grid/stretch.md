# Stretch

`<Grid>` elements default to vertial align "stretch". To prevent that behavior you can set align to "top" (or any other value).

Note that "align" affects the behavior of the _children_ of the element, so to prevent stretch on the parent and on the children you'll have to set `align="top"` both, on the parent's container and on the container itself
