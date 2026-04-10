import { useEffect, useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroVideoSection from './components/sections/HeroVideoSection'
import AboutSection from './components/sections/AboutSection'
import ServicesSection from './components/sections/ServicesSection'
import WhyChooseUsSection from './components/sections/WhyChooseUsSection'
import ResultsShowcase from './components/sections/ResultsShowcase'
import AppointmentSection from './components/sections/AppointmentSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import FAQSection from './components/sections/FAQSection'
import CTASection from './components/sections/CTASection'
import StickyActions from './components/ui/StickyActions'
import CursorGlow from './components/ui/CursorGlow'
import PageLoader from './components/ui/PageLoader'
import { useLenis } from './hooks/useLenis'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useLenis()

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setIsLoading(false)
    }, 1350)

    return () => window.clearTimeout(timerId)
  }, [])

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <CursorGlow />
      <div className="relative min-h-screen overflow-x-clip bg-[var(--color-page)] text-[var(--color-text)]">
        <div className="pointer-events-none fixed inset-0 opacity-60">
          <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(245,73,145,0.18),_transparent_68%)] blur-3xl" />
          <div className="absolute right-[-10rem] top-[20%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(252,223,92,0.16),_transparent_68%)] blur-3xl" />
          <div className="absolute bottom-[-8rem] left-[25%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(143,135,67,0.14),_transparent_68%)] blur-3xl" />
        </div>

        <div className="noise-mask fixed inset-0 pointer-events-none opacity-[0.08]" />

        <Navbar />

        <main>
          <HeroVideoSection />
          <AboutSection />
          <ServicesSection />
          <WhyChooseUsSection />
          <ResultsShowcase />
          <AppointmentSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </main>

        <Footer />
        <StickyActions />
      </div>
    </>
  )
}

export default App
