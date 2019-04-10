import { storiesOf, configure, addDecorator, Story } from '@storybook/react'
// @ts-ignore pending picturebook update
import { withMarkdownNotes } from '@storybook/addon-notes'
import { withKnobs } from '@storybook/addon-knobs'
import { setOptions } from '@storybook/addon-options'
import * as picturebook from 'picturebook'
import { footer, filter } from './shared'

setOptions({
  name: 'gymnast',
  url: 'https://gymnast.readme.io',
})

addDecorator(withKnobs)

function loadStories() {
  picturebook.loadStories({
    storiesOf,
    decorators: [
      (story: Story, { doc }: { doc: string }) =>
        doc && withMarkdownNotes(`${doc}${footer}`)(story),
    ],
    filter,
    stories: require.context('./stories', true, /\.(tsx|md)/),
  })
}

configure(loadStories, module)
