import { AnimatedBlobs } from '../ui/blobs'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'

function BlobsShowcaseSection() {
  const sectionRef = useRevealAnimations()

  return (
    <section
      ref={sectionRef}
      className="full-bleed overflow-hidden border-y border-none px-4 py-12 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,73,145,0.14),transparent_24%),radial-gradient(circle_at_78%_28%,rgba(235,200,0,0.12),transparent_24%),radial-gradient(circle_at_50%_70%,rgba(143,135,67,0.18),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* <div className="reveal">
          <SectionHeading
            eyebrow="Visual Signature"
            title="Motion, glow, and color layered into a branded transition after services."
            description="This section sits directly after the services grid as a softer visual pause before the more content-heavy sections that follow."
          />
        </div> */}

        <div className="reveal">
          <AnimatedBlobs
            label="Ask Me Anything !"
            actionLabel="Start a Conversation"
            actionHref="#appointment"
            className="min-h-[23rem] rounded-[1.25rem] border-none backdrop-blur-xl min-[390px]:min-h-[26rem] sm:min-h-[34rem] sm:rounded-[2rem] lg:min-h-[40rem]"
          />
        </div>

        {/* <div className="reveal mt-8 flex flex-col gap-4 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <p className="max-w-md text-sm leading-7 text-white/68">
            No extra provider or state layer is needed here. The effect is self-contained and
            fully driven by layered CSS-like styling inside the reusable UI component.
          </p>
          <p className="max-w-md text-sm leading-7 text-white/56">
            Best use in this app: a visual separator between service discovery and the richer
            showcase sections below.
          </p>
        </div> */}
      </div>
    </section>
  )
}

export default BlobsShowcaseSection
