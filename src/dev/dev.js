// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import styles from './dev.styles'
import {
  body,
  appendDevContainer,
  removeDevContainer,
  getDevContainer,
} from './dev.logic'

const KEY_CODE_K = 75

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

    const content = (
      <div className={styles.reflexOverlay}>
        <div className={styles.content} />
      </div>
    )

    return ReactDOM.createPortal(content, getDevContainer())
  }
}
