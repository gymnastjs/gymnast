import {
  addDecorator,
  addParameters,
  configure,
  storiesOf,
  Story,
} from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import * as picturebook from 'picturebook'
import { footer } from './shared'

addParameters({
  name: 'gymnast',
  url: 'https://gymnast.readme.io',
})

addDecorator(withKnobs)

function loadStories() {
  picturebook.loadStories({
    storiesOf,
    decorators: [
      (story: Story, { doc }: { doc?: string }) => [
        story,
        doc ? { notes: `${doc}${footer}` } : {},
      ],
    ],
    stories: require.context('./stories', true, /\.(tsx|md)/),
  })
}

configure(loadStories, module)
