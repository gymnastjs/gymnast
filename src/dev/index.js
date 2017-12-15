// @flow
import styles from './dev.styles'
import { noop } from '../utils'

const KEY_CODE_K = 75
const body = ((document: any).body: HTMLElement)

function toggleOverlayMode(overlay, force?: boolean) {
  const hasOverlay = body.contains(overlay)
  const set = typeof force === 'undefined' ? !hasOverlay : force
  styles.reflexDevMode.split(' ').forEach(s => body.classList.toggle(s, set))

  if (set && !hasOverlay) {
    body.appendChild(overlay)
  } else if (!set && hasOverlay) {
    body.removeChild(overlay)
  }
  body.setAttribute('data-reflex-overlay', String(hasOverlay))
}

function getKeyDownHandler(method, { key, useCtrl, useShift }) {
  return function onKeyDown(e: KeyboardEvent) {
    const pressedKey = e.keyCode || e.charCode || 0
    const ctrlKeyPressedOrNotRequired = !useCtrl || (e.ctrlKey || e.metaKey)
    const shiftKeyPressedOrNotRequired = !useShift || e.shiftKey

    if (
      ctrlKeyPressedOrNotRequired &&
      shiftKeyPressedOrNotRequired &&
      key === pressedKey
    ) {
      method()
    }
  }
}

function createOverlay() {
  const overlay = document.createElement('div')
  const content = document.createElement('div')

  overlay.className = styles.reflexOverlay
  content.className = styles.content
  overlay.appendChild(content)

  return overlay
}

const defaults = {
  overlayKeyCode: KEY_CODE_K,
  useCtrl: true,
  useShift: true,
}

const disabledDevMode = {
  register: noop,
  toggleOverlay: noop,
  unregister: noop,
}

type Props = {
  force?: boolean,
  overlayKeyCode?: number,
  useCtrl?: boolean,
  useShift?: boolean,
}

export default function initDevMode({ force, ...props }: Props = {}) {
  if (process.env.NODE_ENV === 'production' && force !== true) {
    return disabledDevMode
  }

  const { overlayKeyCode, ...options } = {
    ...defaults,
    ...props,
  }
  const toggleOverlay = toggleOverlayMode.bind(this, createOverlay())
  const overlayKeyDown = getKeyDownHandler(toggleOverlay, {
    key: overlayKeyCode,
    ...options,
  })

  function register() {
    if (overlayKeyCode) {
      body.addEventListener('keydown', overlayKeyDown)
    }
  }

  function unregister() {
    body.removeEventListener('keydown', overlayKeyDown)
  }

  register()

  return {
    register,
    toggleOverlay,
    unregister,
  }
}
