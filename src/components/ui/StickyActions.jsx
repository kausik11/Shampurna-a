import { useEffect, useRef, useState } from 'react'
import { FiCalendar } from 'react-icons/fi'
import { FaRobot, FaWhatsapp } from 'react-icons/fa6'
import { TiArrowSortedDown } from 'react-icons/ti'
import Typed from 'typed.js'
import { useChatPopup } from '../chat/ChatPopupContext'

const whatsappMessage = encodeURIComponent(
  'Hello Shampurna Aesthetic, I would like to know more about your treatments and book a consultation. Please share the next steps.',
)

const chatHintPrompts = [
  '"What skin problems do your services treat?"',
  '"Which treatment is best for acne scars?"',
  '"How do I book a consultation?"',
]

function StickyActions() {
  const { openChat } = useChatPopup()
  const [showChatHint, setShowChatHint] = useState(true)
  const typedHintRef = useRef(null)

  useEffect(() => {
    if (!showChatHint || !typedHintRef.current) {
      return undefined
    }

    const typed = new Typed(typedHintRef.current, {
      strings: chatHintPrompts,
      typeSpeed: 34,
      backSpeed: 18,
      backDelay: 1800,
      startDelay: 250,
      smartBackspace: true,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    })

    return () => typed.destroy()
  }, [showChatHint])

  const handleOpenChat = () => {
    setShowChatHint(false)
    openChat()
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-2 sm:inset-x-auto sm:bottom-5 sm:right-6 sm:max-w-none sm:gap-3">
      <div className="relative flex items-center justify-end gap-2 sm:gap-3">
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

        <div className="relative flex items-center justify-center">
          {showChatHint ? (
            <div className="absolute bottom-[calc(100%+0.75rem)] right-0 z-10 w-[14.75rem] max-w-[calc(100vw-4rem)] sm:bottom-[calc(100%+0.85rem)] sm:w-[18rem] sm:max-w-[calc(100vw-1.5rem)]">
              <div className="relative overflow-hidden rounded-[8px] border border-[rgba(252,223,92,0.16)] bg-[linear-gradient(135deg,rgba(18,7,14,0.78),rgba(43,14,34,0.62))] p-3 pr-8 shadow-[0_18px_42px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:border-[rgba(252,223,92,0.18)] sm:bg-[linear-gradient(135deg,rgba(18,7,14,0.96),rgba(43,14,34,0.88))] sm:p-4 sm:pr-10 sm:shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:backdrop-blur-2xl">
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(252,223,92,0.78),transparent)]" />
                <button
                  className="absolute right-2.5 top-2.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] text-white/50 transition hover:bg-white/8 hover:text-white/90 sm:right-3 sm:top-3 sm:h-6 sm:w-6 sm:text-xs"
                  type="button"
                  aria-label="Dismiss chatbot message"
                  onClick={() => setShowChatHint(false)}
                >
                  x
                </button>
                <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)] sm:text-[9px] sm:tracking-[0.2em]">
                  AI Chatbot
                </p>
                <ul className="mt-2 text-[10.5px] leading-[1.1rem] text-white/78 sm:mt-3 sm:text-[12px] sm:leading-[1.25rem] sm:text-white/82">
                  <li>
                    <span ref={typedHintRef} />
                  </li>
                </ul>
              </div>
              <TiArrowSortedDown
                className="pointer-events-none absolute -bottom-3.5 right-[0.55rem] text-[1.35rem] text-[rgba(252,223,92,0.86)] drop-shadow-[0_8px_18px_rgba(0,0,0,0.42)] sm:-bottom-4 sm:right-[1.1rem] sm:text-[1.6rem] sm:text-[rgba(252,223,92,0.9)]"
                aria-hidden="true"
              />
            </div>
          ) : null}

          <button
            className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(1,0,2,0.68)] text-[var(--color-highlight)] shadow-[0_18px_45px_rgba(1,0,2,0.32)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 sm:h-14 sm:w-14"
            type="button"
            aria-label="AI Chatbot"
            onClick={handleOpenChat}
          >
            <span className="inline-flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
              <FaRobot className="h-5 w-5 sm:h-7 sm:w-7" aria-hidden="true" />
            </span>
          </button>
        </div>
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
