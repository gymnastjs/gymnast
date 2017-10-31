// @flow
import * as React from 'react'
import { each } from 'lodash'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { storyFolders, WithExtensions } from './shared'

type Component =
  | {
      displayName?: string,
      name?: string,
    }
  | Function

function getDisplayName(WrappedComponent: string | Component): string {
  const defaultName = 'Component'

  if (typeof WrappedComponent !== 'string') {
    return WrappedComponent.displayName || WrappedComponent.name || defaultName
  }

  return WrappedComponent || defaultName
}

/**
 * storyFolders dynamically fetches all files within `/stories`
 */

function unwrapDisplayNameFromHOC(name: string = '') {
  return (name.match(/(?:\(([^()]+)\))/) || [])[1] || name
}

function configStories(storiesOfName: string, storiesModule: typeof module) {
  const stories = storiesOf(storiesOfName, storiesModule)

  stories.addDecorator(withKnobs)

  const addStoryWithJSX = (storyName: string, ComponentFn: () => any) =>
    stories.addWithJSX(storyName, ComponentFn, {
      showDefaultProps: false,
      useBooleanShorthandSyntax: true,
      skip: 1, // assumes each story will have a WithExtensions wrapper, this config option skips that wrapper
      displayName: element =>
        unwrapDisplayNameFromHOC(getDisplayName(element.type)),
    })

  return {
    add: addStoryWithJSX,
  }
}

function addStory({ story: WrappedComponent, notes, name }, component) {
  component.add(name, () => (
    <WithExtensions notes={notes}>
      <WrappedComponent />
    </WithExtensions>
  ))
}

const components = {}

function addComponent(folderpath) {
  if (!(folderpath in components)) {
    components[folderpath] = configStories(folderpath, module)
  }
}

function addStories(content) {
  each(content, props => {
    if ('story' in props) {
      addComponent(props.folderpath)
      addStory(props, components[props.folderpath])
    } else {
      addStories(props)
    }
  })
}

addStories(storyFolders)
