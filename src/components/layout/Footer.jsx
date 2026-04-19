import { useState } from 'react'
import { footerServices, navigationItems, socialLinks } from '../../data/siteData'
import { FiLoader, FiStar } from 'react-icons/fi'
import { socialIcons } from '@/lib/icons'
import { isApiError } from '@/lib/apiClient'
import { submitNewsletterSubscription } from '@/lib/contentApi'

function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault()
    setStatus('')
    setError('')

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }

    setIsSubmitting(true)

    try {
      await submitNewsletterSubscription(email.trim())
      setStatus('You are subscribed.')
      setEmail('')
    } catch (requestError) {
      if (isApiError(requestError)) {
        setError(requestError.response?.data?.message || 'Unable to subscribe right now.')
      } else {
        setError('Unable to subscribe right now.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="relative border-t border-white/10 px-4 pb-24 pt-14 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8 lg:pb-10">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[1.25rem] border border-white/12 bg-[rgba(1,0,2,0.46)] p-4 shadow-[0_30px_80px_rgba(1,0,2,0.36)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-8 md:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_0.85fr_1fr] lg:gap-10">
        <div className="min-w-0">
          <a className="inline-flex min-w-0 items-center gap-3 sm:gap-4" href="#home">
            <img
              className="h-12 w-12 shrink-0 rounded-full border border-[rgba(252,223,92,0.4)] object-cover shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:h-16 sm:w-16"
              src="/shampurna-logo.jpeg"
              alt="Shampurna Aesthetic logo"
            />
            <div className="min-w-0">
              <p className="text-wrap font-display text-2xl leading-tight text-[var(--color-heading)] sm:text-3xl">
                Shampurna Aesthetic
              </p>
              <p className="text-sm text-white/65">
                Luxury skin, body and aesthetic care with a refined clinical
                approach.
              </p>
            </div>
          </a>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
            Thoughtful aesthetic treatments, premium care rituals, and a
            hospitality-led clinic environment designed for confidence, comfort,
            and visible refinement.
          </p>
        </div>

        <div className="min-w-0">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)] sm:text-sm sm:tracking-[0.28em]">
            Quick Links
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <a className="transition hover:text-[var(--color-highlight)]" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)] sm:text-sm sm:tracking-[0.28em]">
            Signature Services
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {footerServices.map((item) => (
              <li key={item}>
                <a className="transition hover:text-[var(--color-highlight)]" href="#services">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)] sm:text-sm sm:tracking-[0.28em]">
            Contact
          </h2>
          <div className="mt-5 space-y-3 text-sm text-white/65">
            <p>Shampurna Aesthetic Clinic</p>
            <p>Premium address placeholder, Kolkata</p>
            <p>
              <a className="transition hover:text-[var(--color-highlight)]" href="tel:9804100036">
                9804100036
              </a>
            </p>
            <p>
              <a
                className="transition hover:text-[var(--color-highlight)]"
                href="mailto:enquiry.shampurna@gmail.com"
              >
                enquiry.shampurna@gmail.com
              </a>
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            {socialLinks.map((item) => {
              const SocialIcon = socialIcons[item.label] ?? FiStar

              return (
                <a
                  key={item.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/6 text-sm text-white/78 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)]"
                  href={item.href}
                  aria-label={item.label}
                >
                  <SocialIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              )
            })}
          </div>

          <form className="mt-6" onSubmit={handleNewsletterSubmit}>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                Newsletter
              </span>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <input
                  className="min-h-11 min-w-0 flex-1 rounded-[0.5rem] border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/32 focus:border-[rgba(252,223,92,0.35)]"
                  type="email"
                  value={email}
                  placeholder="Email address"
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setError('')
                    setStatus('')
                  }}
                />
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.5rem] border border-[rgba(252,223,92,0.2)] bg-[rgba(252,223,92,0.08)] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)] transition hover:bg-[rgba(252,223,92,0.14)] disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <FiLoader className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                  Join
                </button>
              </div>
            </label>
            {status ? <p className="mt-2 text-xs text-[var(--color-gold)]">{status}</p> : null}
            {error ? <p className="mt-2 text-xs text-[var(--color-highlight)]">{error}</p> : null}
          </form>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl flex-col gap-3 px-2 text-[10px] uppercase tracking-[0.16em] text-white/35 sm:flex-row sm:items-center sm:justify-between sm:text-xs sm:tracking-[0.22em]">
        <p>© 2026 Shampurna Aesthetic. All rights reserved.</p>
        <p>Luxury aesthetic frontend experience</p>
      </div>
    </footer>
  )
}

export default Footer
