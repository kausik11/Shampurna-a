import { FiCalendar } from 'react-icons/fi'
import { FaRobot, FaWhatsapp } from 'react-icons/fa6'

function StickyActions() {
  return (
    <div className="fixed bottom-4 right-3 z-40 flex flex-col gap-2 sm:bottom-5 sm:right-6 sm:gap-3">
      <div className="flex items-center justify-end gap-2 sm:gap-3">
        <a
          className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(1,0,2,0.68)] text-[#25D366] shadow-[0_18px_45px_rgba(1,0,2,0.32)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 sm:h-14 sm:w-14"
          href="https://wa.me/910000000000"
          aria-label="WhatsApp"
        >
          <span className="inline-flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
            <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
          </span>
        </a>

        <a
          className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(1,0,2,0.68)] text-[var(--color-highlight)] shadow-[0_18px_45px_rgba(1,0,2,0.32)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 sm:h-14 sm:w-14"
          href="#appointment"
          aria-label="Chatbot"
        >
          <span className="inline-flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
            <FaRobot className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
          </span>
        </a>
      </div>

      <a
        className="button-shine inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(252,223,92,0.2)] bg-[var(--color-button)] px-3 py-2.5 text-xs font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.32)] sm:px-5 sm:py-3 sm:text-sm"
        href="#appointment"
      >
        <FiCalendar className="h-4 w-4" aria-hidden="true" />
        Appointment
      </a>
    </div>
  )
}

export default StickyActions
