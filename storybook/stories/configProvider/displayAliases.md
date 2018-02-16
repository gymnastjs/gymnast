`displayAliases` is an object that contains all aliases for media queries. Each one of them can either be an object or an array of objects with a format that could look like:

```js
{
  tiny: {
    minWidth: '30px'
  }
}
```

This is equivalent to

```js
{
  tiny: [{
    minWidth: '30px'
  }]
}
```

A more complex example could look like:

```js
{
  small: [{
    maxWidth: '320px'
  }, {
    orientation: 'portrait'
  }],
  medium: [{
    minWidth: '321px'
  }, {
    orientation: 'landscape'
  }]
}
```

When placing properties within the same object, they will both be required. E.g. `{ maxWidth: '320px', orientation: 'portrait' }` applies when both, the device is oriented as portrait _and_ the page width is `320px` or less. When they are placed as different array elements, they apply when either is true. E.g. in the example above, `small` size applies with the device is oriented as portrait _or_ the page width is `320px` or less.
