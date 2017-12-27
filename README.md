# ☁️ [xflex](https://xflex.github.io/xflex) &middot; [![CircleCI](https://circleci.com/gh/xflex/xflex/tree/master.svg?style=shield)](https://circleci.com/gh/xflex/xflex/tree/master) [![Test Coverage](https://codeclimate.com/github/xflex/xflex/badges/coverage.svg)](https://codeclimate.com/github/xflex/xflex/coverage) [![npm](https://img.shields.io/npm/v/xflex.svg)](https://www.npmjs.com/package/xflex) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shield)](http://makeapullrequest.com)

xflex is a configurable grid and layout engine for React. With xflex, you can eliminate your layout css or reduce it to just a few lines.

[Learn how to use xflex in your own project](https://github.com/xflex/xflex/wiki/Getting-Started).

or

[Play with a demo](https://codesandbox.io/s/github/xflex/playground)

## 📺 Examples

We have several examples [on the website](https://xflex.github.io/xflex). Here is one of them:

```jsx
import * as React from 'react'
import { Grid } from 'xflex'

<Grid>
  <Grid size={5} margin={2}>Content Here</Grid>
  <Grid size={7}>More Content</Grid>
</Grid>
```

This will create 2 columns of sizes 5, 7 (defaults to a 12-column grid).

There are additional components to assist with layout, for a deeper dive into xflex, check out the [wiki](https://github.com/xflex/xflex/wiki), the examples [here](https://xflex.github.io/xflex) or follow the [Getting Started](https://github.com/xflex/xflex/wiki/Getting-Started) guide.

## 🖥 Install

xflex is available as the `xflex` package on [npm](https://www.npmjs.com/). It is also available on the [unpkg CDN](https://unpkg.com/xflex).

You can install it with:

```bash
yarn add xflex
```

`React` and `PropTypes` are [peer dependencies](https://docs.npmjs.com/files/package.json#peerdependencies) of the generated bundle.

## ⚙️ Dev Mode

Ensuring a layout adheres to the grid can be difficult. To simplify this task, xflex includes an overlay Component to assist you. During development, import and append `<Dev/>` to your pages. It doesn't render anything by default but pressing `CTRL+SHIFT+K` will toggle it.

Learn more about `<Dev />` mode in the [wiki](https://github.com/xflex/xflex/wiki/Dev).

<img src="/img/devMode.png" width="300px" alt="Dev Example" />

```jsx
import * as React from 'react'
import { Dev } from 'xflex'

export default function MyPage() {
  return (<>
    <Dev />
    {/* other components */}
  </>)
}
```

## 👥 Contributors

The main purpose of this repository is to continue to evolve xflex, making it more capable and easier to use. Development of xflex happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Check the [contributing.md](./CONTRIBUTING.md) to learn how you can take part in improving xflex.

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/3877773?v=3" width="100px;"/><br /><sub><b>Oscar Bartra</b></sub>](http://obartra.github.io)<br />[🐛](https://github.com/xflex/xflex/issues?q=author%3Aobartra "Bug reports") [💻](https://github.com/xflex/xflex/commits?author=obartra "Code") [📖](https://github.com/xflex/xflex/commits?author=obartra "Documentation") [👀](#review-obartra "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/8746094?v=3" width="100px;"/><br /><sub><b>Andrew Hansen</b></sub>](https://github.com/arahansen)<br />[💬](#question-arahansen "Answering Questions") [🐛](https://github.com/xflex/xflex/issues?q=author%3Aarahansen "Bug reports") [💻](https://github.com/xflex/xflex/commits?author=arahansen "Code") [👀](#review-arahansen "Reviewed Pull Requests") | [<img src="https://avatars0.githubusercontent.com/u/17904507?v=3" width="100px;"/><br /><sub><b>Stephen Nomura</b></sub>](http://stephennomura.com/)<br />[🎨](#design-snomu "Design") | [<img src="https://avatars3.githubusercontent.com/u/1621615?v=4" width="100px;"/><br /><sub><b>Andrew Toy</b></sub>](https://github.com/andrewmtoy)<br />[🐛](https://github.com/xflex/xflex/issues?q=author%3Aandrewmtoy "Bug reports") [💻](https://github.com/xflex/xflex/commits?author=andrewmtoy "Code") [💡](#example-andrewmtoy "Examples") |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!

## 🏁 Metrics

| Process       | Status    |
|---------------|-----------|
| Code Quality  | [![CircleCI](https://circleci.com/gh/xflex/xflex/tree/master.svg?style=shield)](https://circleci.com/gh/xflex/xflex/tree/master) [![Test Coverage](https://codeclimate.com/github/xflex/xflex/badges/coverage.svg)](https://codeclimate.com/github/xflex/xflex/coverage) [![Code Climate](https://codeclimate.com/github/xflex/xflex/badges/gpa.svg)](https://codeclimate.com/github/xflex/xflex) [![codebeat badge](https://codebeat.co/badges/d3b5abcd-60b2-4ab3-96b6-b3ab392b789d)](https://codebeat.co/projects/github-com-xflex-xflex-master) [![Package Quality](http://npm.packagequality.com/shield/xflex.svg)](http://npm.packagequality.com/#?package=xflex) [![Sauce Test Status](https://saucelabs.com/buildstatus/reflex)](https://saucelabs.com/u/reflex) |
| Versioning    | [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![npm](https://img.shields.io/npm/v/xflex.svg)](https://www.npmjs.com/package/xflex) |
| Dependencies  | [![Known Vulnerabilities](https://snyk.io/test/github/xflex/xflex/badge.svg)](https://snyk.io/test/github/xflex/xflex) [![DavidDM](https://david-dm.org/xflex/xflex.svg)](https://david-dm.org/xflex/xflex) [![bitHound Overall Score](https://www.bithound.io/github/xflex/xflex/badges/score.svg)](https://www.bithound.io/github/xflex/xflex) |
| File Size     | ![gzipped bundle size](http://img.badgesize.io/https://unpkg.com/xflex?compression=gzip) |
| Questions     | [![Join the chat at https://gitter.im/react-reflex/Lobby](https://badges.gitter.im/react-reflex/Lobby.svg)](https://gitter.im/react-reflex/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![xflex StackOverflow tags](https://img.shields.io/badge/stackoverflow-xflex-f48024.svg)](https://stackoverflow.com/questions/tagged/xflex)|

[![Sauce Test Status](https://saucelabs.com/browser-matrix/reflex.svg)](https://saucelabs.com/u/reflex)
