// @flow
import React from 'react'
import { each } from 'lodash'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { utils } from '../src'
import { storyFolders, WithExtensions } from './core'
import '../src/index.css'

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

function deKebab(text) {
  return text
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map((word = '') => {
      const first = (word[0] || '').toUpperCase()

      return `${first}${word.slice(1)}`
    })
    .join(' ')
}

function getName(path) {
  const fileName = path.replace(/^.*[\\/]/, '').replace(/\.js$/, '')

  return deKebab(fileName)
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
