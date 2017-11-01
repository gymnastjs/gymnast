// @flow
import * as React from 'react'
import { WithNotes } from '@storybook/addon-notes'
import layoutStyle from './layout.css'

type Props = {
  notes?: string,
  className?: string,
}

export default function WithExtensions({ notes, className, ...props }: Props) {
  const isCI = window.location.href.indexOf('isCI') !== -1
  const classCI = isCI ? layoutStyle.isCI : undefined

  if (notes) {
    return (
      <div>
        <WithNotes notes={notes}>
          <div {...props} className={classCI} />
        </WithNotes>
      </div>
    )
  }

  return (
    <div>
      <div {...props} className={classCI} />
    </div>
  )
}
