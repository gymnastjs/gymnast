// @flow
import React from 'react'
import { each } from 'lodash'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { utils } from '../src/reflex'
import { storyFolders, WithExtensions } from './shared'

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
        unwrapDisplayNameFromHOC(utils.getDisplayName(element.type)),
    })

  return {
    add: addStoryWithJSX,
  }
}

function addStory({ story: WrappedComponent, notes, name }, component) {
  component.add(name, () =>
    <WithExtensions notes={notes}>
      <WrappedComponent />
    </WithExtensions>
  )
}

const stories = {}

function addStories(content) {
  each(content, props => {
    if ('story' in props) {
      if (!(props.folderpath in stories)) {
        stories[props.folderpath] = configStories(props.folderpath, module)
      }
      addStory(props, stories[props.folderpath])
    } else {
      addStories(props)
    }
  })
}

each(storyFolders, addStories)
