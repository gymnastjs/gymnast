// @flow
import * as React from 'react'
import { Dev } from 'gymnast'

export default function WrapStory(storyFn: () => React.Node) {
  return (
    <React.Fragment>
      <Dev />
      {storyFn()}
    </React.Fragment>
  )
}
