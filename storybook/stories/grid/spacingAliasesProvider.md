You can use the SpacingAliasesProvider along with base to set margins and paddings with convenient aliases.  The base is multiplied with the aliased value to obtain the pixel value.

For example, if base is 8px and XS is aliased to 0.5, the final pixel value of XS is 4px.

| Alias        | Value            | Base(8px) x Alias Value |
| ------------ | ---------------- | ----------------------- |
| XS           | 0.5              | 4px                     |
| S/2          | 0.5              | 4px                     |
| S            | 1                | 8px                     |
| M/2          | 1                | 8px                     |
| M            | 2                | 16px                    |
| L/2          | 1.5              | 12px                    |
| L            | 3                | 24px                    |
| XL/2         | 2                | 16px                    |
| XL           | 4                | 32px                    |
| XXL/2        | 3                | 24px                    |
| XXL          | 6                | 48px                    |
