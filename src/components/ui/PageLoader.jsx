function PageLoader({ isLoading }) {
  return (
    <div
      className={`fixed inset-0 z-[90] grid place-items-center bg-[radial-gradient(circle_at_top,rgba(252,223,92,0.12),transparent_32%),linear-gradient(180deg,#080608,#010002)] transition duration-700 ${
        isLoading ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isLoading}
    >
      <div className="flex flex-col items-center gap-5">
        <img
          className="h-24 w-24 animate-[pulse_1.8s_ease-in-out_infinite] rounded-full border border-[rgba(252,223,92,0.35)] object-cover"
          src="/shampurna-logo.jpeg"
          alt=""
        />
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.34em] text-[var(--color-gold)]">
            Shampurna Aesthetic
          </p>
          <p className="font-display text-3xl text-[var(--color-heading)]">
            Preparing the luxury experience
          </p>
        </div>
      </div>
    </div>
  )
}

export default PageLoader
