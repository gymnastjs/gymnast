import { storiesOf, configure, addDecorator } from '@storybook/react'
import { withMarkdownNotes } from '@storybook/addon-notes'
import { withKnobs } from '@storybook/addon-knobs'
import { setOptions } from '@storybook/addon-options'
import * as picturebook from 'picturebook'
import { footer } from './shared'

setOptions({
  name: 'gymnast',
  url: 'https://gymnast.readme.io',
})

addDecorator(withKnobs)

function loadStories() {
  picturebook.loadStories({
    storiesOf,
    decorators: [
      (story, { doc }) => doc && withMarkdownNotes(`${doc}${footer}`)(story),
    ],
    filter: {
      tests: file => file.endsWith('.spec.tsx'),
      docs: file => file.endsWith('.md'),
      screenshots: file => file.endsWith('.png'),
      story: (file = '', target = '') => file.endsWith(`${target}.tsx`),
    },
    stories: require.context('./stories', true, /\.(tsx|md)/),
  })
}

configure(loadStories, module)
