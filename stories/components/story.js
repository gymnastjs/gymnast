// @flow
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

const stories = storiesOf('Components', module)

stories.addDecorator(withKnobs)

export default stories
