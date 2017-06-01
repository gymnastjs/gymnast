import React from 'react'
import LayoutHOC from './layout.hoc'

class Layout extends React.PureComponent {
  static displayName = 'Layout'

  render() {
    return <div {...this.props} />
  }
}

export default LayoutHOC(Layout)
