import { FiCalendar } from 'react-icons/fi'
import { FaRobot, FaWhatsapp } from 'react-icons/fa6'
import { useChatPopup } from '../chat/ChatPopupContext'

const whatsappMessage = encodeURIComponent(
  'Hello Shampurna Aesthetic, I would like to know more about your treatments and book a consultation. Please share the next steps.',
)

function StickyActions() {
  const { openChat } = useChatPopup()

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-2 sm:inset-x-auto sm:bottom-5 sm:right-6 sm:max-w-none sm:gap-3">
      <div className="flex items-center justify-end gap-2 sm:gap-3">
        <a
          className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(1,0,2,0.68)] text-[#25D366] shadow-[0_18px_45px_rgba(1,0,2,0.32)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 sm:h-14 sm:w-14"
          href={`https://wa.me/919804100036?text=${whatsappMessage}`}
          aria-label="WhatsApp"
          rel="noreferrer"
          target="_blank"
        >
          <span className="inline-flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
            <FaWhatsapp className="h-5 w-5 sm:h-7 sm:w-7" aria-hidden="true" />
          </span>
        </a>

        <button
          className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(1,0,2,0.68)] text-[var(--color-highlight)] shadow-[0_18px_45px_rgba(1,0,2,0.32)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 sm:h-14 sm:w-14"
          type="button"
          aria-label="AI Chatbot"
          onClick={openChat}
        >
          <span className="inline-flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
            <FaRobot className="h-5 w-5 sm:h-7 sm:w-7" aria-hidden="true" />
          </span>
        </button>
      </div>

      <a
        className="button-shine inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-full border border-[rgba(252,223,92,0.2)] bg-[var(--color-button)] px-3.5 py-2.5 text-xs font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.32)] sm:px-5 sm:py-3 sm:text-sm"
        href="#appointment"
      >
        <FiCalendar className="h-4 w-4" aria-hidden="true" />
        Appointment
      </a>
    </div>
  )
}

export default StickyActions
