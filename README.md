# ☁️ Reflex

[![CircleCI](https://circleci.com/gh/obartra/reflex/tree/master.svg?style=shield)](https://circleci.com/gh/obartra/reflex/tree/master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Join the chat at https://gitter.im/react-reflex/Lobby](https://badges.gitter.im/react-reflex/Lobby.svg)](https://gitter.im/react-reflex/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Flexbox React 12-column layout system

## Install

To get the library that exports `Item`, `Grid` and `Layout`, run:

```bash
yarn add @obartra/reflex

```

Note that `React` and `PropTypes` are dependencies of the generated bundle.

## Demo

Check out the demo [here](https://obartra.github.io/reflex). It contains usage examples and mocked page layouts.

## Development

```bash
yarn && yarn build && yarn start
```

And then open `localhost:9001`

## Structure

This project uses [StoryBook](https://github.com/storybooks/storybook), the configuration files are within the `/storybook` folder. The different stories are in the `/stories` folder and `/src` contains the react HOC and Components needed to generate the layout.

## CSS Usage

To use the standalone CSS files run `yarn build`, the `/dist` folder contains the built css artifacts.

## Contributing

To standardize the commit format this project uses [commitizen](https://github.com/commitizen/cz-cli) with [conventional changelog](https://github.com/commitizen/cz-conventional-changelog). Instead of using git, to commit changes run `yarn commit`.

[Visual Studio Code](https://code.visualstudio.com/) with the [flow for vscode](https://github.com/flowtype/flow-for-vscode) and [prettier vscode](https://github.com/esbenp/prettier-vscode) plugins are recommended for development.

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/3877773?v=3" width="100px;"/><br /><sub>Oscar Bartra</sub>](http://obartra.github.io)<br />[🐛](https://github.com/obartra/reflex/issues?q=author%3Aobartra "Bug reports") [💻](https://github.com/obartra/reflex/commits?author=obartra "Code") [📖](https://github.com/obartra/reflex/commits?author=obartra "Documentation") [👀](#review-obartra "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/8746094?v=3" width="100px;"/><br /><sub>Andrew Hansen</sub>](https://github.com/arahansen)<br />[💬](#question-arahansen "Answering Questions") [🐛](https://github.com/obartra/reflex/issues?q=author%3Aarahansen "Bug reports") [💻](https://github.com/obartra/reflex/commits?author=arahansen "Code") [👀](#review-arahansen "Reviewed Pull Requests") | [<img src="https://avatars0.githubusercontent.com/u/17904507?v=3" width="100px;"/><br /><sub>Stephen Nomura</sub>](http://stephennomura.com/)<br />[🎨](#design-snomu "Design") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!
