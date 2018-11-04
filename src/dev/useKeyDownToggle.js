// @flow
import * as React from 'react'

const KEY_CODE_K = 'K'.charCodeAt(0)
type Props = {|
  keyCode: number,
  useCtrl: boolean,
  useShift: boolean,
|}

function useKeyDown(
  { keyCode = KEY_CODE_K, useCtrl = true, useShift = true }: Props,
  onKeysActive: () => void
) {
  React.useEffect(() => {
    document.body.addEventListener('keydown', onKeyDown)

    return () => document.body.removeEventListener('keydown', onKeyDown)
  })

  function onKeyDown(e: KeyboardEvent) {
    const pressedKey = e.keyCode || e.charCode || 0
    const ctrlKeyPressedOrNotRequired = !useCtrl || (e.ctrlKey || e.metaKey)
    const shiftKeyPressedOrNotRequired = !useShift || e.shiftKey
    const shouldTrigger =
      keyCode === pressedKey &&
      ctrlKeyPressedOrNotRequired &&
      shiftKeyPressedOrNotRequired

    if (shouldTrigger) {
      onKeysActive()
    }
  }
}

function useToggle(initial: boolean) {
  const [value, toggle] = React.useState(initial)

  return [value, () => toggle(!value)]
}

export default function useKeyDownToggle(props: Props) {
  const [showOverlay, toggleOverlay] = useToggle(false)

  useKeyDown(props, toggleOverlay)

  return showOverlay
}
