// @flow
import React from 'react'
import { each } from 'lodash'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { utils } from '../src'
import { storyFolders, WithExtensions, getName } from './shared'

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

function addStory({ story: WrappedComponent, notes, namepath }, component) {
  component.add(namepath, () =>
    <WithExtensions notes={notes}>
      <WrappedComponent />
    </WithExtensions>
  )
}

function addStories(content, component) {
  each(content, props => {
    if ('story' in props) {
      addStory(props, component)
    } else {
      addStories(props, component)
    }
  })
}

each(storyFolders, (content, folder) => {
  const component = configStories(getName(folder), module)

  addStories(content, component)
})
