import { createContext, useContext } from 'react'

export const ChatPopupContext = createContext(null)

export function useChatPopup() {
  const context = useContext(ChatPopupContext)

  if (context) {
    return context
  }

  return {
    closeChat: () => {},
    isChatOpen: false,
    openChat: (event) => {
      event?.preventDefault()

      if (typeof window !== 'undefined') {
        window.location.assign('/chat')
      }
    },
  }
}
