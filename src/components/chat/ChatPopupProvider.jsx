import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChatConversationPanel } from './ChatConversationPanel'
import { ChatPopupContext } from './ChatPopupContext'
import { cn } from '@/lib/utils'

function ChatPopup({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-[90] flex items-end justify-center px-3 py-3 transition duration-300 sm:items-center sm:px-6 sm:py-8',
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <button
        className="absolute inset-0 h-full w-full cursor-default bg-[rgba(18,3,11,0.72)] backdrop-blur-[14px]"
        type="button"
        aria-label="Close chat popup"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />

      <div
        className={cn(
          'relative w-full max-w-3xl transform transition duration-300',
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-[0.98] opacity-0',
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-popup-title"
      >
        <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-[radial-gradient(circle_at_18%_16%,rgba(245,73,145,0.36),transparent_34%),radial-gradient(circle_at_88%_10%,rgba(235,200,0,0.24),transparent_30%)] blur-2xl" />
        <ChatConversationPanel compact titleId="chat-popup-title" onClose={onClose} />
      </div>
    </div>,
    document.body,
  )
}

export function ChatPopupProvider({ children }) {
  const [hasOpened, setHasOpened] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const openChat = useCallback((event) => {
    event?.preventDefault()
    setHasOpened(true)
    setIsOpen(true)
  }, [])

  const closeChat = useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      closeChat,
      isChatOpen: isOpen,
      openChat,
    }),
    [closeChat, isOpen, openChat],
  )

  return (
    <ChatPopupContext.Provider value={value}>
      {children}
      {hasOpened ? <ChatPopup isOpen={isOpen} onClose={closeChat} /> : null}
    </ChatPopupContext.Provider>
  )
}
