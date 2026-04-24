import { footerServices, navigationItems, socialLinks } from '../../data/siteData'
import { FiPhoneCall, FiStar } from 'react-icons/fi'
import { socialIcons } from '@/lib/icons'

const phoneNumbers = [
  { label: '98318 33650', href: 'tel:9831833650' },
  { label: '62891 93286', href: 'tel:6289193286' },
]

function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-4 pb-24 pt-14 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8 lg:pb-10">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[1.25rem] border border-white/12 bg-[rgba(1,0,2,0.46)] p-4 shadow-[0_30px_80px_rgba(1,0,2,0.36)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-8 md:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_0.85fr_1fr] lg:gap-10">
        <div className="min-w-0">
          <a className="inline-flex min-w-0 items-center gap-3 sm:gap-4" href="#home">
            <img
              className="h-12 w-12 shrink-0 rounded-full border border-[rgba(252,223,92,0.38)] object-cover object-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:h-16 sm:w-16"
              src="/logo.png"
              alt="Shampurna Aesthetic logo"
            />
            <div className="min-w-0">
              <p className="text-wrap font-display text-2xl leading-tight text-[var(--color-heading)] sm:text-3xl">
                Shampurna Aesthetic Clinic
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
          <address className="mt-5 space-y-3 text-sm not-italic text-white/65">
            <p>Shampurna Aesthetic Clinic</p>
            <p>Ps Aviator Building, Rajarhat Main Road, Chinar Park</p>
            <p>3rd Floor, Unit-303, Kolkata -700136</p>
            <div className="grid gap-2 pt-1 sm:grid-cols-2 lg:grid-cols-1">
              {phoneNumbers.map((phone) => (
                <a
                  key={phone.href}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-[rgba(252,223,92,0.34)] bg-[rgba(252,223,92,0.1)] px-4 py-3 text-sm font-bold text-[var(--color-gold)] shadow-[0_16px_34px_rgba(143,135,67,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[rgba(252,223,92,0.16)] hover:text-[var(--color-highlight)]"
                  href={phone.href}
                >
                  <FiPhoneCall className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {phone.label}
                </a>
              ))}
            </div>
            <p>
              <a
                className="transition hover:text-[var(--color-highlight)]"
                href="mailto:enquiry.shampurna@gmail.com"
              >
                enquiry.shampurna@gmail.com
              </a>
            </p>
          </address>

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

      <div className="mx-auto mt-6 flex max-w-7xl flex-col gap-3 px-2 text-[10px] uppercase tracking-[0.16em] text-white/35 sm:flex-row sm:items-center sm:justify-between sm:text-xs sm:tracking-[0.22em]">
        <p>&copy; 2026 Shampurna Aesthetic. All rights reserved.</p>
        <p className="normal-case tracking-normal text-white/45 sm:text-[0.8rem]">
          Designed and developed by{' '}
          <a
            className="font-medium text-[var(--color-gold)] transition hover:text-[var(--color-highlight)]"
            href="https://www.linkedin.com/in/kausik-saha-fsd"
            target="_blank"
            rel="noreferrer"
          >
            Kausik
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
