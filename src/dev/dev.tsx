// @flow
import * as React from 'react'
import ConfigConsumer from '../configProvider/consumer'
import getStyles from './dev.styles'
import Grid from '../grid'
import Root from '../root'
import Layout from '../layout'
import { getValues, times } from '../utils'
import type { ConfigContextType } from '../types'

const KEY_CODE_K = 'K'.charCodeAt(0)
type Props = {|
  keyCode: number,
  useCtrl: boolean,
  useShift: boolean,
|}

type State = {|
  showOverlay: boolean,
|}

export default class Dev extends React.Component<Props, State> {
  static defaultProps = {
    keyCode: KEY_CODE_K,
    useCtrl: true,
    useShift: true,
  }

  state = {
    showOverlay: false,
  }

  componentDidMount() {
    if (document.body) {
      document.body.addEventListener('keydown', this.onKeyDown)
    }
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.removeEventListener('keydown', this.onKeyDown)
    }
  }

  onKeyDown = (e: KeyboardEvent) => {
    const { keyCode, useCtrl, useShift } = this.props
    const { showOverlay } = this.state
    const pressedKey = e.keyCode || e.charCode || 0
    const ctrlKeyPressedOrNotRequired = !useCtrl || (e.ctrlKey || e.metaKey)
    const shiftKeyPressedOrNotRequired = !useShift || e.shiftKey

    if (
      ctrlKeyPressedOrNotRequired &&
      shiftKeyPressedOrNotRequired &&
      keyCode === pressedKey
    ) {
      this.setState({ showOverlay: !showOverlay })
    }
  }

  renderDevContent = (context: ConfigContextType) => {
    const { showOverlay } = this.state

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

  render() {
    return <ConfigConsumer>{this.renderDevContent}</ConfigConsumer>
  }
}
