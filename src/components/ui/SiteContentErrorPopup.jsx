import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FiRefreshCcw, FiX } from 'react-icons/fi'
import useSiteContent from '../../hooks/useSiteContent'

function SiteContentErrorPopup() {
  const { errors, dismissErrors, refreshContent } = useSiteContent()
  const isOpen = errors.length > 0

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        dismissErrors()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [dismissErrors, isOpen])

  if (!isOpen || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className="fixed inset-x-0 bottom-28 z-[130] flex justify-center px-4 sm:bottom-6 sm:translate-y-[-7rem]">
      <div
        className="w-full max-w-lg rounded-[0.5rem] border border-[rgba(245,73,145,0.24)] bg-[rgba(32,6,22,0.96)] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-5"
        role="dialog"
        aria-modal="false"
        aria-labelledby="site-content-error-title"
      >
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <p
              id="site-content-error-title"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-highlight)] sm:tracking-[0.24em]"
            >
              Some content could not update
            </p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Testimonials, gallery, results, videos, or FAQs may be showing saved fallback content.
            </p>
          </div>

          <button
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.5rem] border border-white/10 bg-white/[0.04] text-white/65 transition hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)]"
            type="button"
            aria-label="Close content error"
            onClick={dismissErrors}
          >
            <FiX className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="inline-flex min-h-10 items-center gap-2 rounded-[0.5rem] border border-[rgba(245,73,145,0.22)] bg-[rgba(245,73,145,0.1)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-highlight)] transition hover:bg-[rgba(245,73,145,0.16)]"
            type="button"
            onClick={refreshContent}
          >
            <FiRefreshCcw className="h-4 w-4" aria-hidden="true" />
            Retry
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default SiteContentErrorPopup
