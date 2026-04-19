import { useEffect, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import StickyActions from '../ui/StickyActions'
import CursorGlow from '../ui/CursorGlow'
import { ChatPopupProvider } from '../chat/ChatPopupProvider'

function AppShell() {
  const location = useLocation()

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) {
      return undefined
    }

    const originalScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = originalScrollRestoration
    }
  }, [])

  useLayoutEffect(() => {
    const lenis = window.__lenis

    lenis?.stop?.()
    lenis?.scrollTo?.(0, { immediate: true, force: true })
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    const frameId = window.requestAnimationFrame(() => {
      lenis?.scrollTo?.(0, { immediate: true, force: true })
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      lenis?.start?.()
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [location.pathname])

  return (
    <>
      <CursorGlow />
      <ChatPopupProvider>
        <div className="relative min-h-screen overflow-x-clip bg-[var(--color-page)] text-[var(--color-text)]">
          <div className="pointer-events-none fixed inset-0 opacity-60">
            <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(245,73,145,0.18),_transparent_68%)] blur-3xl" />
            <div className="absolute right-[-10rem] top-[20%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(252,223,92,0.16),_transparent_68%)] blur-3xl" />
            <div className="absolute bottom-[-8rem] left-[25%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(143,135,67,0.14),_transparent_68%)] blur-3xl" />
          </div>

          <div className="noise-mask fixed inset-0 pointer-events-none opacity-[0.08]" />

          <Navbar />

          <main>
            <Outlet />
          </main>

          <Footer />
          <StickyActions />
        </div>
      </ChatPopupProvider>
    </>
  )
}

export default AppShell
