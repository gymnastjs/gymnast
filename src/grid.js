import React from 'react'
import GridHOC from './grid.hoc'

class Grid extends React.PureComponent {
  static displayName = 'Grid'

  render() {
    return <div {...this.props} />
  }
}

export default GridHOC(Grid)
