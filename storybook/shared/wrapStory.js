// @flow
import * as React from 'react'
import { Dev } from 'xn-reflex'

export default function WrappedStory(story: React.Node) {
  return (
    <React.Fragment>
      <Dev />
      {story}
    </React.Fragment>
  )
}
