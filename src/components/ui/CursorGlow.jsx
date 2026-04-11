import { useEffect, useState } from 'react'

function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return undefined
    }

    const handleMove = (event) => {
      setVisible(true)
      setPosition({ x: event.clientX, y: event.clientY })
    }

    const handleLeave = () => setVisible(false)

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerleave', handleLeave)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed z-[70] hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(255,245,120,0.14)] bg-[radial-gradient(circle,_rgba(255,245,120,0.22)_0%,_rgba(235,200,0,0.12)_24%,_rgba(235,200,0,0.05)_46%,_transparent_78%)] shadow-[0_0_28px_rgba(255,245,120,0.1)] blur-2xl transition-opacity duration-300 md:block ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ left: position.x, top: position.y }}
    />
  )
}

export default CursorGlow
