// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import { configProviderContext } from '../configProvider'
import getStyles from './dev.styles'
import {
  body,
  appendDevContainer,
  removeDevContainer,
  getDevContainer,
} from './dev.logic'
import Grid from '../grid'
import Root from '../root'
import Layout from '../layout'
import { getValues, times } from '../utils'

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
    appendDevContainer()
    body().addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
    removeDevContainer()
    body().removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = (e: KeyboardEvent) => {
    const { keyCode, useCtrl, useShift } = this.props
    const pressedKey = e.keyCode || e.charCode || 0
    const ctrlKeyPressedOrNotRequired = !useCtrl || (e.ctrlKey || e.metaKey)
    const shiftKeyPressedOrNotRequired = !useShift || e.shiftKey

    if (
      ctrlKeyPressedOrNotRequired &&
      shiftKeyPressedOrNotRequired &&
      keyCode === pressedKey
    ) {
      this.setState({ showOverlay: !this.state.showOverlay })
    }
  }

  render() {
    if (!this.state.showOverlay) {
      return null
    }

    return (
      <configProviderContext.Consumer>
        {context => {
          const values = getValues(context)
          const styles = getStyles(values)
          const content = (
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

          return ReactDOM.createPortal(content, getDevContainer())
        }}
      </configProviderContext.Consumer>
    )
  }
}
