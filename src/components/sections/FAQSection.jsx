import { useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import GlassPanel from '../ui/GlassPanel'
import { faqs } from '../../data/siteData'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <GlassPanel className="overflow-hidden p-0">
      <button
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="font-medium text-[var(--color-heading)]">{item.question}</span>
        <span className="text-xl text-[var(--color-gold)]">{isOpen ? '−' : '+'}</span>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? 'grid-rows-[1fr] border-t border-white/10' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 py-4 text-sm leading-7 text-white/65">{item.answer}</p>
        </div>
      </div>
    </GlassPanel>
  )
}

function FAQSection() {
  const sectionRef = useRevealAnimations()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="reveal">
          <SectionHeading
            align="left"
            eyebrow="Frequently Asked Questions"
            title="Concise answers presented with the same clarity as the rest of the brand."
            description="Clients often want reassurance around consultation, downtime, comfort, and treatment planning. This accordion keeps that information elegant and accessible."
          />
        </div>

        <div className="reveal space-y-4">
          {faqs.map((item, index) => (
            <FAQItem
              key={item.question}
              isOpen={openIndex === index}
              item={item}
              onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
