# ☁️ [Reflex](https://obartra.github.io/reflex) &middot; [![CircleCI](https://circleci.com/gh/obartra/reflex/tree/master.svg?style=shield)](https://circleci.com/gh/obartra/reflex/tree/master) [![Test Coverage](https://codeclimate.com/github/obartra/reflex/badges/coverage.svg)](https://codeclimate.com/github/obartra/reflex/coverage) [![npm](https://img.shields.io/npm/v/xn-reflex.svg)](https://www.npmjs.com/package/xn-reflex) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shield)](http://makeapullrequest.com)

Reflex is a React and flexbox-based layout solution. With Reflex, you can eliminate your layout css or reduce it to just a few lines.

[Learn how to use Reflex in your own project](https://github.com/obartra/reflex/wiki/Getting-Started).

or

[Play with a demo](https://codesandbox.io/s/1zxk60lxx4)

## 📺 Examples

We have several examples [on the website](https://obartra.github.io/reflex). Here is one of them:

```jsx
import { Grid, Layout } from 'xn-reflex'
import'xn-reflex/dist/reflex.css'

<Layout dev={1} fixed="top">
  <Grid margin={[0, 1]} padding={[0, 1]}>
    Content here
  </Grid>
</Layout>
```

This example will add a fixed section with the text "Content here" on the page.

The `Layout` Component defines sections in the page that have full width. `Grid` is used for the 12-column layout. We recommend checking the examples [here](https://obartra.github.io/reflex) and following the [Getting Started](https://github.com/obartra/reflex/wiki/Getting-Started) guide for more information.

## 🖥 Install

Reflex is available as the `xn-reflex` package on [npm](https://www.npmjs.com/). It is also available on the [unpkg CDN](https://unpkg.com/xn-reflex/dist/reflex.min.js) and the CSS [here](https://unpkg.com/xn-reflex/dist/reflex.css).

You can install it with:

```bash
yarn add xn-reflex
```

`React` and `PropTypes` are dependencies of the generated bundle and you'll need to make sure you include the CSS file from `xn-reflex/dist/reflex.css`.

## ⚙️ Dev Mode

Ensuring a layout adheres to the grid can be difficult. To simplify this task, Reflex includes 2 tools to assist you: a grid overlay and a dev background color mode. You can initialize both invoking `initDevMode`.

Learn more about dev mode in the [wiki](https://github.com/obartra/reflex/wiki/Dev-Mode).

<img src="/img/devMode.png" width="300px" alt="Dev Mode Example" />

```js
import { initDevMode } from 'xn-reflex'

const { toggleColor, toggleOverlay } = initDevMode()
```

## 👥 Contributors

The main purpose of this repository is to continue to evolve Reflex, making it more capable and easier to use. Development of Reflex happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Check the [contributing.md](./CONTRIBUTING.md) to learn how you can take part in improving Reflex.

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/3877773?v=3" width="100px;"/><br /><sub><b>Oscar Bartra</b></sub>](http://obartra.github.io)<br />[🐛](https://github.com/obartra/reflex/issues?q=author%3Aobartra "Bug reports") [💻](https://github.com/obartra/reflex/commits?author=obartra "Code") [📖](https://github.com/obartra/reflex/commits?author=obartra "Documentation") [👀](#review-obartra "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/8746094?v=3" width="100px;"/><br /><sub><b>Andrew Hansen</b></sub>](https://github.com/arahansen)<br />[💬](#question-arahansen "Answering Questions") [🐛](https://github.com/obartra/reflex/issues?q=author%3Aarahansen "Bug reports") [💻](https://github.com/obartra/reflex/commits?author=arahansen "Code") [👀](#review-arahansen "Reviewed Pull Requests") | [<img src="https://avatars0.githubusercontent.com/u/17904507?v=3" width="100px;"/><br /><sub><b>Stephen Nomura</b></sub>](http://stephennomura.com/)<br />[🎨](#design-snomu "Design") | [<img src="https://avatars3.githubusercontent.com/u/1621615?v=4" width="100px;"/><br /><sub><b>Andrew Toy</b></sub>](https://github.com/andrewmtoy)<br />[🐛](https://github.com/obartra/reflex/issues?q=author%3Aandrewmtoy "Bug reports") [💻](https://github.com/obartra/reflex/commits?author=andrewmtoy "Code") [💡](#example-andrewmtoy "Examples") |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!

## 🏁 Metrics

| Process       | Status    |
|---------------|-----------|
| Code Quality  | [![CircleCI](https://circleci.com/gh/obartra/reflex/tree/master.svg?style=shield)](https://circleci.com/gh/obartra/reflex/tree/master) [![Test Coverage](https://codeclimate.com/github/obartra/reflex/badges/coverage.svg)](https://codeclimate.com/github/obartra/reflex/coverage) [![Code Climate](https://codeclimate.com/github/obartra/reflex/badges/gpa.svg)](https://codeclimate.com/github/obartra/reflex) [![codebeat badge](https://codebeat.co/badges/d3b5abcd-60b2-4ab3-96b6-b3ab392b789d)](https://codebeat.co/projects/github-com-obartra-reflex-master) [![Package Quality](http://npm.packagequality.com/shield/xn-reflex.svg)](http://npm.packagequality.com/#?package=xn-reflex) [![Sauce Test Status](https://saucelabs.com/buildstatus/reflex)](https://saucelabs.com/u/reflex) |
| Versioning    | [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![npm](https://img.shields.io/npm/v/xn-reflex.svg)](https://www.npmjs.com/package/xn-reflex) |
| Dependencies  | [![Known Vulnerabilities](https://snyk.io/test/github/obartra/reflex/badge.svg)](https://snyk.io/test/github/obartra/reflex) [![DavidDM](https://david-dm.org/obartra/reflex.svg)](https://david-dm.org/obartra/reflex) [![bitHound Overall Score](https://www.bithound.io/github/obartra/reflex/badges/score.svg)](https://www.bithound.io/github/obartra/reflex) |
| File Size     | ![max gzipped bundle size](https://img.shields.io/badge/gzip-11.0kb-brightgreen.svg) |
| Questions     | [![Join the chat at https://gitter.im/react-reflex/Lobby](https://badges.gitter.im/react-reflex/Lobby.svg)](https://gitter.im/react-reflex/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![xn-reflex StackOverflow tags](https://img.shields.io/badge/stackoverflow-xn--reflex-f48024.svg)](https://stackoverflow.com/questions/tagged/xn-reflex)|

[![Sauce Test Status](https://saucelabs.com/browser-matrix/reflex.svg)](https://saucelabs.com/u/reflex)
