# ☁️ Reflex

[![CircleCI](https://circleci.com/gh/obartra/reflex/tree/master.svg?style=shield)](https://circleci.com/gh/obartra/reflex/tree/master)
[![Test Coverage](https://codeclimate.com/github/obartra/reflex/badges/coverage.svg)](https://codeclimate.com/github/obartra/reflex/coverage)
[![Join the chat at https://gitter.im/react-reflex/Lobby](https://badges.gitter.im/react-reflex/Lobby.svg)](https://gitter.im/react-reflex/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Flexbox React 12-column layout system

## 🖥 Install

To get the library that exports `Item`, `Grid` and `Layout`, run:

```bash
yarn add xn-reflex

```

Note that `React` and `PropTypes` are dependencies of the generated bundle.

## 📝 Demo

Check out the demo [here](https://obartra.github.io/reflex). It contains usage examples and mocked page layouts.

## 💻 Development

```bash
yarn && yarn build && yarn start
```

And then open `localhost:9001`

## 🏗️ Structure

This project uses [StoryBook](https://github.com/storybooks/storybook), the configuration files are within the `/storybook` folder. The different stories are in the `/stories` folder and `/src` contains the react HOC and Components needed to generate the layout.

## 👥 Contributing

To standardize the commit format this project uses [commitizen](https://github.com/commitizen/cz-cli) with [conventional changelog](https://github.com/commitizen/cz-conventional-changelog). Instead of using git, to commit changes run `yarn commit`.

[Visual Studio Code](https://code.visualstudio.com/) with the [flow for vscode](https://github.com/flowtype/flow-for-vscode) and [prettier vscode](https://github.com/esbenp/prettier-vscode) plugins are recommended for development.

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/3877773?v=3" width="100px;"/><br /><sub>Oscar Bartra</sub>](http://obartra.github.io)<br />[🐛](https://github.com/obartra/reflex/issues?q=author%3Aobartra "Bug reports") [💻](https://github.com/obartra/reflex/commits?author=obartra "Code") [📖](https://github.com/obartra/reflex/commits?author=obartra "Documentation") [👀](#review-obartra "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/8746094?v=3" width="100px;"/><br /><sub>Andrew Hansen</sub>](https://github.com/arahansen)<br />[💬](#question-arahansen "Answering Questions") [🐛](https://github.com/obartra/reflex/issues?q=author%3Aarahansen "Bug reports") [💻](https://github.com/obartra/reflex/commits?author=arahansen "Code") [👀](#review-arahansen "Reviewed Pull Requests") | [<img src="https://avatars0.githubusercontent.com/u/17904507?v=3" width="100px;"/><br /><sub>Stephen Nomura</sub>](http://stephennomura.com/)<br />[🎨](#design-snomu "Design") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!

## 🏁 Metrics

| Process       | Status    |
|---------------|-----------|
| Code Quality  | [![CircleCI](https://circleci.com/gh/obartra/reflex/tree/master.svg?style=shield)](https://circleci.com/gh/obartra/reflex/tree/master) [![Test Coverage](https://codeclimate.com/github/obartra/reflex/badges/coverage.svg)](https://codeclimate.com/github/obartra/reflex/coverage) [![Code Climate](https://codeclimate.com/github/obartra/reflex/badges/gpa.svg)](https://codeclimate.com/github/obartra/reflex) [![CircleCI](https://circleci.com/gh/obartra/reflex/tree/master.svg?style=shield)](https://circleci.com/gh/obartra/reflex/tree/master) [![codebeat badge](https://codebeat.co/badges/d3b5abcd-60b2-4ab3-96b6-b3ab392b789d)](https://codebeat.co/projects/github-com-obartra-reflex-master) |
| Versioning    | [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![npm](https://img.shields.io/npm/v/xn-reflex.svg)](https://www.npmjs.com/package/xn-reflex) |
| Dependencies  | [![Known Vulnerabilities](https://snyk.io/test/github/obartra/reflex/badge.svg)](https://snyk.io/test/github/obartra/reflex) [![DavidDM](https://david-dm.org/obartra/reflex.svg)](https://david-dm.org/obartra/reflex) [![bitHound Overall Score](https://www.bithound.io/github/obartra/reflex/badges/score.svg)](https://www.bithound.io/github/obartra/reflex) |


