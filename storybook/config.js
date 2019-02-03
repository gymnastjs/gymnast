import { storiesOf, configure, addDecorator } from '@storybook/react'
import { withMarkdownNotes } from '@storybook/addon-notes'
import { withKnobs } from '@storybook/addon-knobs'
import { setOptions } from '@storybook/addon-options'
import * as picturebook from 'picturebook'
import { footer } from './shared'

setOptions({
  name: 'gymnast',
  url: 'https://github.com/gymnastjs/gymnast',
})

addDecorator(withKnobs)

function loadStories() {
  picturebook.loadStories({
    storiesOf,
    decorators: [
      (story, { doc }) => doc && withMarkdownNotes(`${doc}${footer}`)(story),
    ],
    stories: require.context('./stories', true, /\.(js|md|png)/),
  })
}

configure(loadStories, module)
