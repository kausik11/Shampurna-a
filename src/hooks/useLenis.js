import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
    })

    window.__lenis = lenis

    let frameId = 0

    const raf = (time) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(raf)
    }

    frameId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(frameId)
      if (window.__lenis === lenis) {
        delete window.__lenis
      }
      lenis.destroy()
    }
  }, [])
}
