import HeroVideoSection from '../components/sections/HeroVideoSection'
import HeroGallerySection from '../components/sections/HeroGallerySection'
import AboutSection from '../components/sections/AboutSection'
import ServicesSection from '../components/sections/ServicesSection'
import BlobsShowcaseSection from '../components/sections/BlobsShowcaseSection'
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection'
import ResultsShowcase from '../components/sections/ResultsShowcase'
import TreatmentGallerySection from '../components/sections/TreatmentGallerySection'
import BeforeAfterSection from '../components/sections/BeforeAfterSection'
import AppointmentSection from '../components/sections/AppointmentSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import VideoTestimonialsSection from '../components/sections/VideoTestimonialsSection'
import FAQSection from '../components/sections/FAQSection'
import CTASection from '../components/sections/CTASection'

function HomePage() {
  return (
    <>
      <HeroVideoSection />
      <HeroGallerySection />
      <AboutSection />
      <ServicesSection />
      <BlobsShowcaseSection />
      <TreatmentGallerySection />
      <WhyChooseUsSection />
      <ResultsShowcase />
      <BeforeAfterSection />
      <AppointmentSection />
      <TestimonialsSection />
      <VideoTestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}

export default HomePage
