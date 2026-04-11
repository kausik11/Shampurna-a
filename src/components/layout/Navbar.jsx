import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link, NavLink } from 'react-router-dom'
import { navigationItems } from '../../data/siteData'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!panelRef.current) {
      return
    }

    gsap.to(panelRef.current, {
      autoAlpha: isOpen ? 1 : 0,
      y: isOpen ? 0 : -16,
      duration: 0.35,
      ease: 'power3.out',
      pointerEvents: isOpen ? 'auto' : 'none',
    })
  }, [isOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/12 bg-[rgba(1,0,2,0.58)] px-4 py-3 shadow-[0_24px_60px_rgba(1,0,2,0.34)] backdrop-blur-2xl">
        <Link className="inline-flex items-center gap-3" to="/">
          <img
            className="h-12 w-12 rounded-full border border-[rgba(252,223,92,0.38)] object-cover"
            src="/shampurna-logo.jpeg"
            alt="Shampurna Aesthetic logo"
          />
          <div className="hidden sm:block">
            <p className="font-display text-2xl leading-none text-[var(--color-heading)]">
              Shampurna
            </p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
              Aesthetic Clinic
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.label}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-[var(--color-highlight)] ${
                  isActive ? 'text-[var(--color-gold)]' : 'text-white/70'
                }`
              }
              to={item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            className="button-shine inline-flex items-center rounded-full border border-[rgba(252,223,92,0.22)] bg-[var(--color-button)] px-5 py-3 text-sm font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.32)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(143,135,67,0.42)]"
            to="/contact"
          >
            Book Appointment
          </Link>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white lg:hidden"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation</span>
          {isOpen ? <FiX className="h-5 w-5" aria-hidden="true" /> : <FiMenu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <div
        ref={panelRef}
        id="mobile-menu"
        className="pointer-events-none invisible mx-auto mt-3 max-w-7xl rounded-[1.75rem] border border-white/12 bg-[rgba(1,0,2,0.78)] p-4 opacity-0 shadow-[0_24px_60px_rgba(1,0,2,0.38)] backdrop-blur-2xl lg:hidden"
      >
        <nav className="flex flex-col gap-3">
          {navigationItems.map((item) => (
            <NavLink
              key={item.label}
              className={({ isActive }) =>
                `rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm font-medium transition hover:border-[rgba(235,200,0,0.24)] hover:text-[var(--color-highlight)] ${
                  isActive ? 'text-[var(--color-gold)]' : 'text-white/75'
                }`
              }
              to={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            className="button-shine mt-2 inline-flex items-center justify-center rounded-2xl bg-[var(--color-button)] px-4 py-3 text-sm font-semibold text-[#f5efcf]"
            to="/contact"
            onClick={() => setIsOpen(false)}
          >
            Book Appointment
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
