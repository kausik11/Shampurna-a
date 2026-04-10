function StickyActions() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:right-6">
      <a
        className="inline-flex items-center gap-3 rounded-full border border-[rgba(252,223,92,0.18)] bg-[rgba(8,8,10,0.72)] px-4 py-3 text-sm font-semibold text-[var(--color-heading)] shadow-[0_18px_45px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-highlight)]"
        href="https://wa.me/910000000000"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(252,223,92,0.08)] text-[var(--color-gold)]">
          W
        </span>
        WhatsApp
      </a>
      <a
        className="button-shine inline-flex items-center justify-center rounded-full border border-[rgba(252,223,92,0.2)] bg-[var(--color-button)] px-5 py-3 text-sm font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.32)]"
        href="#appointment"
      >
        Appointment
      </a>
    </div>
  )
}

export default StickyActions
