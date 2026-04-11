import { FiCalendar } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'

function StickyActions() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:right-6">
      <a
        className="inline-flex items-center gap-3 rounded-full border border-[rgba(235,200,0,0.18)] bg-[rgba(1,0,2,0.68)] px-4 py-3 text-sm font-semibold text-[var(--color-heading)] shadow-[0_18px_45px_rgba(1,0,2,0.32)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-highlight)]"
        href="https://wa.me/910000000000"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(252,223,92,0.08)] text-[var(--color-gold)]">
          <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
        </span>
        WhatsApp
      </a>
      <a
        className="button-shine inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(252,223,92,0.2)] bg-[var(--color-button)] px-5 py-3 text-sm font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.32)]"
        href="#appointment"
      >
        <FiCalendar className="h-4 w-4" aria-hidden="true" />
        Appointment
      </a>
    </div>
  )
}

export default StickyActions
