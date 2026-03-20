const APP_READY_EVENT = 'w13:app-ready'
const HERO_READY_EVENT = 'w13:hero-ready'

function dispatchInitialLoaderEvent(eventName: string) {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new Event(eventName))
}

export function signalInitialAppReady() {
  dispatchInitialLoaderEvent(APP_READY_EVENT)
}

export function signalInitialHeroReady() {
  dispatchInitialLoaderEvent(HERO_READY_EVENT)
}
