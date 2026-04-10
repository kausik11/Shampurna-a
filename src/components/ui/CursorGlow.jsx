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
      className={`pointer-events-none fixed z-[70] hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(252,223,92,0.16),_rgba(245,73,145,0.08),_transparent_70%)] blur-2xl transition-opacity duration-300 md:block ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ left: position.x, top: position.y }}
    />
  )
}

export default CursorGlow
