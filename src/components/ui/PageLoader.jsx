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
          className="h-28 w-28 animate-[pulse_1.8s_ease-in-out_infinite] object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.35)]  sm:h-32 sm:w-32"
          src="/logo.png"
          alt="Shampurna Aesthetic"
        />
        <div className="space-y-3 text-center">
          <p className="font-display text-3xl leading-none text-[var(--color-gold)] sm:text-4xl">
            Shampurna Aesthetic
          </p>
          <p className="text-wrap font-display text-3xl leading-tight text-[var(--color-heading)] sm:text-4xl">
            Step into your most radiant self.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PageLoader
