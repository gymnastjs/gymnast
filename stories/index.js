// @flow
import React from 'react'
import { each } from 'lodash'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { utils } from '../src'
import { storyFolders, WithExtensions } from './core'
import { getName } from '../getName'

/**
 * storyFolders dynamically fetches all files within `/components`, `/grid` and `/layout`. Here we
 * add all stories to storybook
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

function getNote(path, notes) {
  return notes[path.replace(/\.js$/, '.md')]
}

each(storyFolders, (content, folder) => {
  const component = configStories(getName(folder), module)

  each(content.stories, (WrappedComponent, key) => {
    component.add(getName(key), () =>
      <WithExtensions notes={getNote(key, content.notes)}>
        <WrappedComponent />
      </WithExtensions>
    )
  })
})
