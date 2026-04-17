import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { ChatConversationPanel } from '@/components/chat/ChatConversationPanel'

function ChatPage() {
  return (
    <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(245,73,145,0.16),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(235,200,0,0.14),transparent_26%),linear-gradient(180deg,#4a1138_0%,#380828_48%,#12030b_100%)]" />

      <div className="relative mx-auto max-w-6xl">
        <Link
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/78 backdrop-blur-xl transition hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)]"
          to="/"
        >
          <FiArrowLeft aria-hidden="true" />
          Back home
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
          <div className="flex flex-col justify-between rounded-[1.25rem] border border-white/12 bg-[rgba(1,0,2,0.34)] p-5 shadow-[0_24px_70px_rgba(1,0,2,0.3)] backdrop-blur-2xl sm:rounded-[1.5rem] sm:p-7">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-highlight)] sm:text-xs sm:tracking-[0.34em]">
                Clinic Chat
              </p>
              <h1 className="mt-4 text-wrap font-display text-[2.2rem] leading-[1.02] text-[var(--color-heading)] sm:text-5xl lg:text-6xl">
                Ask Me Anything.
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/68 sm:text-base">
                Share your concern and the assistant will respond through the clinic workflow.
              </p>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-white/62">
              <p className="rounded-[0.85rem] border border-white/10 bg-white/[0.05] p-4">
                Try asking: Which treatment is suitable for pigmentation?
              </p>
              <p className="rounded-[0.85rem] border border-white/10 bg-white/[0.05] p-4">
                For urgent medical symptoms, contact the clinic directly.
              </p>
            </div>
          </div>

          <ChatConversationPanel />
        </div>
      </div>
    </section>
  )
}

export default ChatPage
