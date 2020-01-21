import {
  addDecorator,
  addParameters,
  configure,
  storiesOf,
} from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import * as picturebook from 'picturebook'
import { footer } from './shared'

addParameters({
  name: 'gymnast',
  url: 'https://gymnast.readme.io',
  jsx: {},
})

addDecorator(withKnobs)

function loadStories() {
  picturebook.loadStories({
    storiesOf,
    decorators: [
      (story: React.Component<{}>, { doc }: { doc?: string }) => [
        story,
        doc ? { notes: `${doc}${footer}` } : {},
      ],
    ],
    stories: require.context('./stories', true, /\.(tsx|md)/),
  })
}

configure(loadStories, module)
