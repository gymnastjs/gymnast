import React from 'react'
import ItemHOC from './item.hoc'

class Item extends React.PureComponent {
  static displayName = 'Item'

  render() {
    return <div {...this.props} />
  }
}

export default ItemHOC(Item)
