[![CircleCI](https://circleci.com/gh/obartra/flexgrid/tree/master.svg?style=shield)](https://circleci.com/gh/obartra/flexgrid/tree/master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# ☁️ FlexGrid

[![Join the chat at https://gitter.im/react-reflex/Lobby](https://badges.gitter.im/react-reflex/Lobby.svg)](https://gitter.im/react-reflex/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

12-column layout with Flexbox

## Demo

Check out the build [here](https://obartra.github.io/flexgrid)

## Setup

```bash
$ yarn && yarn start
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
| [<img src="https://avatars3.githubusercontent.com/u/3877773?v=3" width="100px;"/><br /><sub>Oscar Bartra</sub>](http://obartra.github.io)<br />[🐛](https://github.com/obartra/flexgrid/issues?q=author%3Aobartra "Bug reports") [💻](https://github.com/obartra/flexgrid/commits?author=obartra "Code") [📖](https://github.com/obartra/flexgrid/commits?author=obartra "Documentation") [👀](#review-obartra "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/8746094?v=3" width="100px;"/><br /><sub>Andrew Hansen</sub>](https://github.com/arahansen)<br />[💬](#question-arahansen "Answering Questions") [🐛](https://github.com/obartra/flexgrid/issues?q=author%3Aarahansen "Bug reports") [💻](https://github.com/obartra/flexgrid/commits?author=arahansen "Code") [👀](#review-arahansen "Reviewed Pull Requests") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!
