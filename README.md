<p align="center">
  <a href="https://gymnastjs.github.io/gymnast">
    <img alt="gymnast" src="https://github.com/gymnastjs/gymnast/blob/master/img/gymnast.png?raw=true" width="160">
  </a>
</p>

<p align="center">
  <b>gymnast</b> is a configurable grid for React
</p>

<p align="center">
  <a href="https://gymnast.readme.io/docs"><img alt="docs" src="https://img.shields.io/badge/readme.io-docs-1469cc.svg"></a>
  <a href="https://circleci.com/gh/gymnastjs/gymnast"><img alt="Circle Status" src="https://circleci.com/gh/gymnastjs/gymnast/tree/master.svg?style=shield"></a>
  <a href="https://codeclimate.com/github/gymnastjs/gymnast/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/gymnastjs/gymnast/badges/coverage.svg"></a>
  <a href="http://makeapullrequest.com"><img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shield"></a>
</p>

---

With gymnast, you can eliminate your layout css or reduce it to just a few lines.

[Learn how to use gymnast in your own project](https://gymnast.readme.io/docs/getting-started).

or

[Play with a demo](https://codesandbox.io/s/github/gymnastjs/playground)

## 📺 Examples

We have several examples [on the website](https://gymnastjs.github.io/gymnast). Here is one of them:

```jsx
import * as React from 'react'
import { Grid } from 'gymnast'

<Grid>
  <Grid size={5} margin={2}>Content Here</Grid>
  <Grid size={7}>More Content</Grid>
</Grid>
```

This will create 2 columns of sizes 5, 7, respectively.

For a deeper dive into gymnast, check out the [docs](https://gymnast.readme.io), the examples [here](https://gymnastjs.github.io/gymnast) or follow the [Getting Started](https://gymnast.readme.io/docs/getting-started) guide.

## 🖥 Install

gymnast is available as the `gymnast` package on [npm](https://www.npmjs.com/). It is also available on the [unpkg CDN](https://unpkg.com/gymnast).

You can install it with:

```bash
yarn add gymnast
```

`React` and `PropTypes` are [peer dependencies](https://docs.npmjs.com/files/package.json#peerdependencies) of the generated bundle.

## 👥 Contributors

The main purpose of this repository is to continue to evolve gymnast, making it more capable and easier to use. Development of gymnast happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Check the [contributing.md](./CONTRIBUTING.md) to learn how you can take part in improving gymnast.

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/3877773?v=3" width="100px;"/><br /><sub><b>Oscar Bartra</b></sub>](http://obartra.github.io)<br />[🐛](https://github.com/gymnastjs/gymnast/issues?q=author%3Aobartra "Bug reports") [💻](https://github.com/gymnastjs/gymnast/commits?author=obartra "Code") [📖](https://github.com/gymnastjs/gymnast/commits?author=obartra "Documentation") [👀](#review-obartra "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/8746094?v=3" width="100px;"/><br /><sub><b>Andrew Hansen</b></sub>](https://github.com/arahansen)<br />[💬](#question-arahansen "Answering Questions") [🐛](https://github.com/gymnastjs/gymnast/issues?q=author%3Aarahansen "Bug reports") [💻](https://github.com/gymnastjs/gymnast/commits?author=arahansen "Code") [👀](#review-arahansen "Reviewed Pull Requests") | [<img src="https://avatars0.githubusercontent.com/u/17904507?v=3" width="100px;"/><br /><sub><b>Stephen Nomura</b></sub>](http://stephennomura.com/)<br />[🎨](#design-snomu "Design") | [<img src="https://avatars3.githubusercontent.com/u/1621615?v=4" width="100px;"/><br /><sub><b>Andrew Toy</b></sub>](https://github.com/andrewmtoy)<br />[🐛](https://github.com/gymnastjs/gymnast/issues?q=author%3Aandrewmtoy "Bug reports") [💻](https://github.com/gymnastjs/gymnast/commits?author=andrewmtoy "Code") [💡](#example-andrewmtoy "Examples") | [<img src="https://avatars0.githubusercontent.com/u/7918955?v=4" width="100px;"/><br /><sub><b>colinlgray</b></sub>](https://github.com/colinlgray)<br />[🐛](https://github.com/gymnastjs/gymnast/issues?q=author%3Acolinlgray "Bug reports") | [<img src="https://avatars0.githubusercontent.com/u/4695062?v=4" width="100px;"/><br /><sub><b>Jeffrey Klein</b></sub>](http://jeffwklein)<br />[🐛](https://github.com/gymnastjs/gymnast/issues?q=author%3Ajeffwklein "Bug reports") [💻](https://github.com/gymnastjs/gymnast/commits?author=jeffwklein "Code") [⚠️](https://github.com/gymnastjs/gymnast/commits?author=jeffwklein "Tests") | [<img src="https://avatars2.githubusercontent.com/u/10682341?v=4" width="100px;"/><br /><sub><b>Derrick Nguyen</b></sub>](https://github.com/derrickhnguyen)<br />[💻](https://github.com/gymnastjs/gymnast/commits?author=derrickhnguyen "Code") [⚠️](https://github.com/gymnastjs/gymnast/commits?author=derrickhnguyen "Tests") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!

## 🏁 Metrics

| Process      | Status                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Code Quality | [![CircleCI](https://circleci.com/gh/gymnastjs/gymnast/tree/master.svg?style=shield)](https://circleci.com/gh/gymnastjs/gymnast/tree/master) [![Test Coverage](https://codeclimate.com/github/gymnastjs/gymnast/badges/coverage.svg)](https://codeclimate.com/github/gymnastjs/gymnast/coverage) [![Code Climate](https://codeclimate.com/github/gymnastjs/gymnast/badges/gpa.svg)](https://codeclimate.com/github/gymnastjs/gymnast) [![codebeat badge](https://codebeat.co/badges/d3b5abcd-60b2-4ab3-96b6-b3ab392b789d)](https://codebeat.co/projects/github-com-gymnastjs-gymnast-master) [![Package Quality](http://npm.packagequality.com/shield/gymnast.svg)](http://npm.packagequality.com/#?package=gymnast) [![Sauce Test Status](https://saucelabs.com/buildstatus/reflex)](https://saucelabs.com/u/reflex) |
| Versioning   | [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![npm](https://img.shields.io/npm/v/gymnast.svg)](https://www.npmjs.com/package/gymnast)                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Dependencies | [![Known Vulnerabilities](https://snyk.io/test/github/gymnastjs/gymnast/badge.svg)](https://snyk.io/test/github/gymnastjs/gymnast) [![DavidDM](https://david-dm.org/gymnastjs/gymnast.svg)](https://david-dm.org/gymnastjs/gymnast)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| File Size    | ![gzipped bundle size](http://img.badgesize.io/https://unpkg.com/gymnast?compression=gzip)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Questions    | [![Join the discussion at https://gymnast.readme.io/discuss](https://img.shields.io/badge/readme.io-discuss-1469cc.svg)](https://gymnast.readme.io/discuss) [![gymnast StackOverflow tags](https://img.shields.io/badge/stackoverflow-gymnast-f48024.svg)](https://stackoverflow.com/questions/tagged/gymnast)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

[![Sauce Test Status](https://saucelabs.com/browser-matrix/reflex.svg)](https://saucelabs.com/u/reflex)
