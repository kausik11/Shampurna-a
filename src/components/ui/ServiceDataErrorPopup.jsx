import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FiRefreshCcw, FiX } from 'react-icons/fi'
import useServices from '../../hooks/useServices'

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  'Unable to load the latest services right now.'

function ServiceDataErrorPopup() {
  const { error, dismissError, refreshServices } = useServices()
  const isOpen = Boolean(error)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        dismissError()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [dismissError, isOpen])

  if (!isOpen || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className="fixed inset-x-0 bottom-4 z-[130] flex justify-center px-4 sm:bottom-6">
      <div
        className="w-full max-w-lg rounded-[0.5rem] border border-[rgba(252,223,92,0.22)] bg-[rgba(32,6,22,0.96)] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-5"
        role="dialog"
        aria-modal="false"
        aria-labelledby="service-data-error-title"
      >
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <p
              id="service-data-error-title"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)] sm:tracking-[0.24em]"
            >
              Services update failed
            </p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              {getErrorMessage(error)} Showing saved service data instead.
            </p>
          </div>

          <button
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.5rem] border border-white/10 bg-white/[0.04] text-white/65 transition hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)]"
            type="button"
            aria-label="Close services error"
            onClick={dismissError}
          >
            <FiX className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="inline-flex min-h-10 items-center gap-2 rounded-[0.5rem] border border-[rgba(252,223,92,0.18)] bg-[rgba(252,223,92,0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)] transition hover:bg-[rgba(252,223,92,0.14)]"
            type="button"
            onClick={refreshServices}
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

export default ServiceDataErrorPopup
