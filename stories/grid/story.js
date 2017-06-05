// @flow
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

const stories = storiesOf('Grid', module)

stories.addDecorator(withKnobs)

export default stories
