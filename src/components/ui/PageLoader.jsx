function PageLoader({ isLoading }) {
  return (
    <div
      className={`fixed inset-0 z-[90] grid place-items-center bg-[radial-gradient(circle_at_top,rgba(235,200,0,0.12),transparent_32%),radial-gradient(circle_at_20%_20%,rgba(245,73,145,0.14),transparent_30%),linear-gradient(180deg,#4a1138,#380828)] transition duration-700 ${
        isLoading ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isLoading}
    >
      <div className="flex max-w-[90vw] flex-col items-center gap-5 px-4">
        <img
          className="h-24 w-24 animate-[pulse_1.8s_ease-in-out_infinite] rounded-full border border-[rgba(252,223,92,0.35)] object-cover"
          src="/shampurna-logo.jpeg"
          alt=""
        />
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] sm:tracking-[0.34em]">
            Shampurna Aesthetic
          </p>
          <p className="text-wrap font-display text-2xl leading-tight text-[var(--color-heading)] sm:text-3xl">
            Preparing the luxury experience
          </p>
        </div>
      </div>
    </div>
  )
}

export default PageLoader
