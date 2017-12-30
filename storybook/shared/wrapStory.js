// @flow
import * as React from 'react'
import { Dev } from 'gymnast'

export default function WrappedStory(story: React.Node) {
  return (
    <React.Fragment>
      <Dev />
      {story}
    </React.Fragment>
  )
}
