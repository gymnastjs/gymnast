// @flow
import React from 'react'
import { WithNotes } from '@storybook/addon-notes'
import { boolean } from '@storybook/addon-knobs'
import style from './designGrid.css'

export default class WithExtensions extends React.PureComponent {
  static defaultProps = {
    notes: '',
    className: '',
  }

  getDesignGrid = () =>
    <div className={style.designGrid}>
      <div className={style.contentArea} />
    </div>

  props: {
    notes?: string,
    className?: string,
  }

  render() {
    const { notes, className, ...props } = this.props
    const designGrid = boolean('Overlay', false) && this.getDesignGrid()

    if (notes) {
      return (
        <div>
          {designGrid}
          <WithNotes notes={notes}>
            <div {...props} />
          </WithNotes>
        </div>
      )
    }

    return (
      <div>
        {designGrid}
        <div {...props} />
      </div>
    )
  }
}
