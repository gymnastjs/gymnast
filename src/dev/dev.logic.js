const overlayId = 'xflex-dev-overlay'

export function getDevContainer() {
  return document.querySelector(`#${overlayId}`)
}

export function body() {
  if (!document.body) {
    throw new Error('body not available')
  }
  return document.body
}

export function appendDevContainer() {
  const overlay = getDevContainer()

  if (!overlay) {
    const newOverlay = document.createElement('div')
    newOverlay.id = overlayId

    body().appendChild(newOverlay)
  }
}

export function removeDevContainer() {
  const overlay = getDevContainer()

  if (overlay) {
    body().removeChild(overlay)
  }
}
