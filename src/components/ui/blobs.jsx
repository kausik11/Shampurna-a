import { cn } from '@/lib/utils'
import { FaArrowRightLong } from 'react-icons/fa6'

export function AnimatedBlobs({
  className,
  label = 'Blobs',
  actionLabel,
  actionHref = '#appointment',
}) {
  const blobStyle = {
    '--border-radius': '115% 140% 145% 110% / 125% 140% 110% 125%',
    '--border-width': '5vmin',
    aspectRatio: '1',
    display: 'block',
    gridArea: 'stack',
    backgroundSize: 'calc(100% + var(--border-width) * 2)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    border: 'var(--border-width) solid transparent',
    borderRadius: 'var(--border-radius)',
    maskImage: 'linear-gradient(transparent, transparent), linear-gradient(black, white)',
    maskClip: 'padding-box, border-box',
    maskComposite: 'intersect',
    mixBlendMode: 'screen',
    height: 'clamp(15rem, 68vmin, 40rem)',
    filter: 'blur(1.1vmin)',
  }

  const blobs = [
    {
      backgroundColor: '#EBC800',
      backgroundImage: 'linear-gradient(#EBC800, #FFF4A8, #EBC800)',
      transform: 'rotate(30deg) scale(1.03)',
    },
    {
      backgroundColor: '#F54991',
      backgroundImage: 'linear-gradient(#F54991, #FF8CC4, #F54991)',
      transform: 'rotate(60deg) scale(0.95)',
    },
    {
      backgroundColor: '#8f8743',
      backgroundImage: 'linear-gradient(#8f8743, #D4C56D, #8f8743)',
      transform: 'rotate(90deg) scale(0.97)',
    },
    {
      backgroundColor: '#7A2557',
      backgroundImage: 'linear-gradient(#7A2557, #380828, #7A2557)',
      transform: 'rotate(120deg) scale(1.02)',
    },
  ]

  return (
    <div
      className={cn(
        'relative flex min-h-[23rem] w-full items-center justify-center overflow-hidden min-[390px]:min-h-[26rem] sm:min-h-[34rem] lg:min-h-[38rem]',
        className,
      )}
    >
      {label ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6">
          <div className="flex max-w-[min(88vw,32rem)] flex-col items-center gap-4 text-center sm:gap-6">
            <span className="text-center font-display text-[2rem] leading-[0.96] tracking-normal text-[var(--color-heading)] min-[390px]:text-4xl sm:text-5xl lg:text-[5.5rem]">
              {label}
            </span>
            {actionLabel ? (
              <a
                href={actionHref}
                className="button-shine pointer-events-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[rgba(252,223,92,0.22)] bg-[var(--color-button)] px-5 py-3 text-center text-sm font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.32)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(143,135,67,0.42)] sm:px-6 sm:py-3.5"
              >
                <span>{actionLabel}</span>
                <FaArrowRightLong className="text-xs" />
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="grid" style={{ gridTemplateAreas: "'stack'" }}>
        <div
          className="relative grid"
          style={{
            gridTemplateAreas: "'stack'",
            gridArea: 'stack',
            animation: 'blob-spin 18s linear infinite',
          }}
        >
          {blobs.map((blob, index) => (
            <span
              key={index}
              style={{
                ...blobStyle,
                ...blob,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blob-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
