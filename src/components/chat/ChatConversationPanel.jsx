import { useEffect, useMemo, useRef, useState } from 'react'
import { FiLoader, FiRefreshCcw, FiSend, FiX } from 'react-icons/fi'
import { cn } from '@/lib/utils'

const CHAT_WEBHOOK_URL =
  import.meta.env.VITE_CLINIC_CHAT_WEBHOOK_URL ||
  'https://kabirhi.app.n8n.cloud/webhook/clinic-chat'

const REQUEST_TIMEOUT_MS = 60000

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const getSessionId = () => {
  const storageKey = 'shampurna-chat-session-id'

  try {
    const existingSessionId = window.localStorage.getItem(storageKey)

    if (existingSessionId) {
      return existingSessionId
    }

    const nextSessionId = createId()
    window.localStorage.setItem(storageKey, nextSessionId)
    return nextSessionId
  } catch {
    return createId()
  }
}

const extractReplyText = (payload) => {
  if (!payload) {
    return ''
  }

  if (typeof payload === 'string') {
    return payload
  }

  if (Array.isArray(payload)) {
    return payload.map(extractReplyText).find(Boolean) || ''
  }

  const responseKeys = ['reply', 'response', 'answer', 'message', 'text', 'output', 'result', 'content']

  for (const key of responseKeys) {
    const value = payload[key]

    if (typeof value === 'string' && value.trim()) {
      return value
    }

    if (value && typeof value === 'object') {
      const nestedReply = extractReplyText(value)

      if (nestedReply) {
        return nestedReply
      }
    }
  }

  if (payload.data) {
    return extractReplyText(payload.data)
  }

  if (payload.json) {
    return extractReplyText(payload.json)
  }

  return ''
}

const buildPayload = ({ message, sessionId }) => ({
  message,
  text: message,
  sessionId,
  channel: 'website-chat',
  source: 'shampurna-aesthetic',
  page: typeof window !== 'undefined' ? window.location.href : '/chat',
  timestamp: new Date().toISOString(),
})

async function sendChatMessage({ message, sessionId }) {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(CHAT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildPayload({ message, sessionId })),
      signal: controller.signal,
    })

    const contentType = response.headers.get('content-type') || ''
    const rawResponseText = await response.text()
    const responsePayload =
      contentType.includes('application/json') && rawResponseText.trim()
        ? JSON.parse(rawResponseText)
        : rawResponseText

    if (!response.ok) {
      throw new Error(`Chat workflow returned ${response.status}`)
    }

    return (
      extractReplyText(responsePayload) ||
      'Thank you. Your message reached the clinic workflow. The assistant is preparing the next response.'
    )
  } finally {
    window.clearTimeout(timeoutId)
  }
}

function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[88%] rounded-[1rem] px-4 py-3 text-sm leading-6 shadow-[0_14px_40px_rgba(1,0,2,0.22)] sm:max-w-[78%]',
          isUser
            ? 'bg-[var(--color-button)] text-[#fff8df]'
            : 'border border-white/12 bg-white/[0.07] text-white/78 backdrop-blur-xl',
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
      </div>
    </div>
  )
}

export function ChatConversationPanel({ className, compact = false, onClose, titleId }) {
  const sessionId = useMemo(() => getSessionId(), [])
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hello, I am here to help with Shampurna treatments, appointments, preparation, and aftercare questions.',
    },
  ])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const lastUserMessageRef = useRef('')
  const messagesEndRef = useRef(null)

  const isSending = status === 'sending'
  const canSend = input.trim().length > 0 && !isSending
  const messageInputId = titleId ? `${titleId}-message` : 'clinic-chat-message'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, status])

  const submitMessage = async (event, retryMessage) => {
    event?.preventDefault()

    const messageText = (retryMessage || input).trim()

    if (!messageText || isSending) {
      return
    }

    lastUserMessageRef.current = messageText
    setInput('')
    setErrorMessage('')
    setStatus('sending')

    const userMessage = {
      id: createId(),
      role: 'user',
      text: messageText,
    }

    setMessages((currentMessages) => [...currentMessages, userMessage])

    try {
      const replyText = await sendChatMessage({
        message: messageText,
        sessionId,
      })

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createId(),
          role: 'assistant',
          text: replyText,
        },
      ])
      setStatus('idle')
    } catch (error) {
      const nextError =
        error?.name === 'AbortError'
          ? 'The clinic chat took too long to respond. Please try again.'
          : 'The clinic chat is unavailable right now. Please try again in a moment.'

      setErrorMessage(nextError)
      setStatus('error')
    }
  }

  const handleTextareaKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submitMessage(event)
    }
  }

  const retryLastMessage = () => {
    submitMessage(null, lastUserMessageRef.current)
  }

  return (
    <div
      className={cn(
        'relative flex flex-col border border-white/12 bg-[rgba(1,0,2,0.54)] shadow-[0_28px_90px_rgba(1,0,2,0.36)] backdrop-blur-2xl',
        compact
          ? 'h-[calc(100dvh-1.5rem)] max-h-[44rem] rounded-[1.25rem] sm:h-[min(82dvh,44rem)] sm:rounded-[1.5rem]'
          : 'min-h-[34rem] rounded-[1.25rem] sm:rounded-[1.5rem]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
        <div>
          <p id={titleId || undefined} className="text-sm font-semibold text-[var(--color-heading)]">
            Shampurna Assistant
          </p>
          <p className="mt-1 text-xs text-white/45">Connected to clinic workflow</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(235,200,0,0.2)] bg-[rgba(235,200,0,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)]">
            Live
          </span>
          {onClose ? (
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/70 transition hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)]"
              type="button"
              aria-label="Close chat"
              onClick={onClose}
            >
              <FiX aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5" aria-live="polite">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isSending ? (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-2 rounded-[1rem] border border-white/12 bg-white/[0.07] px-4 py-3 text-sm text-white/70 backdrop-blur-xl">
                <FiLoader className="animate-spin" aria-hidden="true" />
                Thinking
              </div>
            </div>
          ) : null}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {errorMessage ? (
        <div className="mx-4 mb-3 rounded-[0.85rem] border border-[rgba(245,73,145,0.35)] bg-[rgba(245,73,145,0.1)] p-3 text-sm text-white/76 sm:mx-5">
          <p>{errorMessage}</p>
          <button
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 px-4 py-2 font-semibold text-[var(--color-heading)] transition hover:border-[var(--color-highlight)]"
            type="button"
            onClick={retryLastMessage}
          >
            <FiRefreshCcw aria-hidden="true" />
            Retry
          </button>
        </div>
      ) : null}

      <form className="border-t border-white/10 p-3 sm:p-4" onSubmit={submitMessage}>
        <label className="sr-only" htmlFor={messageInputId}>
          Type your message
        </label>
        <div className="flex flex-col gap-3 rounded-[1rem] border border-white/12 bg-white/[0.05] p-2 sm:flex-row sm:items-end">
          <textarea
            id={messageInputId}
            className={cn(
              'flex-1 resize-none bg-transparent px-3 py-3 text-sm leading-6 text-[var(--color-heading)] outline-none placeholder:text-white/38 sm:min-h-12',
              compact ? 'min-h-20' : 'min-h-24',
            )}
            placeholder="Type your question..."
            value={input}
            rows={2}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleTextareaKeyDown}
          />
          <button
            className="button-shine inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-button)] px-5 py-3 text-sm font-semibold text-[#fff8df] shadow-[0_16px_40px_rgba(143,135,67,0.28)] transition disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={!canSend}
          >
            {isSending ? <FiLoader className="animate-spin" aria-hidden="true" /> : <FiSend aria-hidden="true" />}
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
