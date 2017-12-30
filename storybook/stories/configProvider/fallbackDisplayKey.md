Some times it is inconvenient to specify all display keys when you only want to change one value on one resolution. `fallbackDisplayKey` allows you to provide a fallback value.

For instance, if you want to set size to 2 columns on large displays but to 10 on all other ones, you could do:

```javascript
<Grid size={{ large: 2, medium: 10, small: 10 }}>
```

This is fine when you have 2 or 3 breakpoints but it quickly becomes cumbersome. Instead you can also do:

```javascript
<Grid size={{ large: 2, default: 10 }}>
```

Note that `'default'` is the default value for the `fallbackDisplayKey` prop but you can modify it using `<ConfigProvider />`. For instance:

```javascript
<ConfigProvider fallbackDisplayKey="fallback">
  <Grid size={{ large: 2, fallback: 10 }}>
</ConfigProvider>
```
