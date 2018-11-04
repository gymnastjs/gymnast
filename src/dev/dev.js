// @flow
import * as React from 'react'
import ConfigContext from '../configProvider/context'
import getStyles from './dev.styles'
import Grid from '../grid'
import Root from '../root'
import Layout from '../layout'
import { getValues, times } from '../utils'
import useKeyDownToggle from './useKeyDownToggle'

type Props = {|
  keyCode: number,
  useCtrl: boolean,
  useShift: boolean,
|}

export default function Dev(props: Props) {
  const showOverlay = useKeyDownToggle(props)
  const context = React.useContext(ConfigContext)

  if (!showOverlay) {
    return null
  }

  const values = getValues(context)
  const styles = getStyles(values)

  return (
    <Layout className={styles.gymnastOverlay}>
      <div className={styles.leftMargin} />
      <Root>
        {times(values.columns).map(key => (
          <Grid
            margin={[0, values.gutter / 2]}
            key={key}
            size={1}
            className={styles.col}
          />
        ))}
      </Root>
      <div className={styles.rightMargin} />
    </Layout>
  )
}
