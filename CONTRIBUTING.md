# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Note that we have a code of conduct, follow it in all your interactions with the project.

**Working on your first Pull Request?** You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Getting Started

This project uses [Node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/).

[Visual Studio Code](https://code.visualstudio.com/) with the [prettier vscode](https://github.com/esbenp/prettier-vscode) plugin are recommended for development.

### Setup

After you clone the repo, run:

```bash
yarn && yarn start
```

This will install all dependencies needed and start storybook. You should now be able to navigate to `http://localhost:9001`.

### Structure

[Storybook](https://github.com/storybooks/storybook) is used to showcase all the behavior and as a main source for image comparison and snapshot testing. The configuration files are within the `/storybook` folder. Storybook stories are in the `/stories` folder and `/src` contains the react HOC and Components needed to generate the layout.

The published npm package is based on the contents of `/src` only.

## Pull Request Process

1. commit changes using `yarn commit` instead of git. This will use [commitizen](https://github.com/commitizen/cz-cli) with [conventional changelog](https://github.com/commitizen/cz-conventional-changelog) to standardize the format.
2. Ensure all status checks pass and that tests are added for new features
3. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
4. You may merge the Pull Request in once you have the sign-off of another developers, or if you do not have permission to do that, you may request the reviewer to merge it for you.
