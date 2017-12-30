# Fixed Parameter

The Layout Component can be position outside the normal flow to either the top (`fixed="top"`) or bottom (`fixed="bottom"`) of the page.

## Knobs

Change the fixed parameter from `Top` to `Bottom` to see the different rendering behavior.

## Examples

The [Cards](https://gymnastjs.github.io/gymnast/?selectedKind=%20Examples&selectedStory=Cards) and [Holy Grail](https://gymnastjs.github.io/gymnast/?selectedKind=%20Examples&selectedStory=Holy%20Grail) Examples show how sticky headers implemented using the fixed parameter.

Note that because `fixed` positions Components outside the normal flow of the page and gymnast doesn't know their size, additional CSS will be required to offset the content below.
