# Padding

Padding can be set for any Grid or Item components. Valid values are:

- top
- right
- bottom
- left
- horizontal
- vertical
- all
- none

Additional sides always take precedence so "none all" is the same than "all".

"vertical top bottom" has no different meaning than just "vertical" since the same sides are affected. To define all sides but "left", for instance, one could do "top right bottom" or "vertical right"

Also note that while `Grid` has no margins by default but `Item` has a `24px` bottom margin and `12px` lateral ones. These are in addition to any padding.

If you have trouble visualizing the padding effects, set Margin and Items Margin to `"None"`. That will show only the effects of padding.
