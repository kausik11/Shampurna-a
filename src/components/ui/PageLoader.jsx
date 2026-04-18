import loaderImage from '../../assets/s_purna.png'

function PageLoader({ isLoading }) {
  return (
    <div
      className={`fixed inset-0 z-[90] overflow-hidden bg-[linear-gradient(180deg,#4a1138,#380828)] transition duration-700 ${
        isLoading ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isLoading}
    >
      {/* <img
        className="absolute inset-0 h-full w-full scale-105 object-cover object-top opacity-25 blur-sm"
        src={loaderImage}
        alt=""
      /> */}
      <img
        className="absolute inset-0 z-[95] h-full w-full object-contain object-top"
        src={loaderImage}
        alt=""
      />
      <div className="absolute inset-0 z-[100] bg-[radial-gradient(circle_at_top,rgba(235,200,0,0.12),transparent_32%),radial-gradient(circle_at_20%_20%,rgba(245,73,145,0.14),transparent_30%),linear-gradient(180deg,rgba(18,4,12,0.05)_0%,rgba(18,4,12,0.2)_58%,rgba(18,4,12,0.88)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-[110] flex flex-col items-center gap-4 px-4 pb-8 text-center sm:pb-12">
        <img
          className="h-16 w-16 rounded-md object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.4)] md:h-14 md:w-14"
          src="/logo.png"
          alt="Shampurna Aesthetic"
        />
        <div className="z-[120] space-y-3">
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
