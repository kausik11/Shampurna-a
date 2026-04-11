import { footerServices, navigationItems, socialLinks } from '../../data/siteData'
import { FiStar } from 'react-icons/fi'
import { socialIcons } from '@/lib/icons'

function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-white/12 bg-[rgba(1,0,2,0.46)] p-8 shadow-[0_30px_80px_rgba(1,0,2,0.36)] backdrop-blur-2xl lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <a className="inline-flex items-center gap-4" href="#home">
            <img
              className="h-16 w-16 rounded-full border border-[rgba(252,223,92,0.4)] object-cover shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              src="/shampurna-logo.jpeg"
              alt="Shampurna Aesthetic logo"
            />
            <div>
              <p className="font-display text-3xl text-[var(--color-heading)]">
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

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
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

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
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

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
            Contact
          </h2>
          <div className="mt-5 space-y-3 text-sm text-white/65">
            <p>Shampurna Aesthetic Clinic</p>
            <p>Premium address placeholder, Kolkata</p>
            <p>
              <a className="transition hover:text-[var(--color-highlight)]" href="tel:+910000000000">
                +91 00000 00000
              </a>
            </p>
            <p>
              <a
                className="transition hover:text-[var(--color-highlight)]"
                href="mailto:concierge@shampurnaaesthetic.com"
              >
                concierge@shampurnaaesthetic.com
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
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl flex-col gap-3 px-2 text-xs uppercase tracking-[0.22em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Shampurna Aesthetic. All rights reserved.</p>
        <p>Luxury aesthetic frontend experience</p>
      </div>
    </footer>
  )
}

export default Footer
