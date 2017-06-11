// @flow
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

function unwrapDisplayNameFromHOC(name: string = '') {
  return (name.match(/(?:\(([^()]+)\))/) || [])[1] || name
}

const configStories = (storiesOfName: string, storiesModule: typeof module) => {
  const stories = storiesOf(storiesOfName, storiesModule)

  stories.addDecorator(withKnobs)

  const addStoryWithJSX = (storyName: string, ComponentFn: () => any) =>
    stories.addWithJSX(storyName, ComponentFn, {
      showDefaultProps: false,
      useBooleanShorthandSyntax: true,
      skip: 1, // assumes each story will have a WithExtensions wrapper, this config option skips that wrapper
      displayName: element =>
        unwrapDisplayNameFromHOC(element.type.displayName) ||
        element.type.displayName ||
        element.type.name ||
        element.type,
    })

  return {
    add: addStoryWithJSX,
  }
}

export default configStories
