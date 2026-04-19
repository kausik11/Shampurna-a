import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import PageLoader from './components/ui/PageLoader'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import GalleryPage from './pages/GalleryPage'
import TestimonialsPage from './pages/TestimonialsPage'
import ContactPage from './pages/ContactPage'
import ChatPage from './pages/ChatPage'
import { useLenis } from './hooks/useLenis'
import { ServicesProvider } from './context/ServicesContext'
import { SiteContentProvider } from './context/SiteContentProvider'
import ServiceDataErrorPopup from './components/ui/ServiceDataErrorPopup'
import SiteContentErrorPopup from './components/ui/SiteContentErrorPopup'

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
      <ServicesProvider>
        <SiteContentProvider>
          <ServiceDataErrorPopup />
          <SiteContentErrorPopup />
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </SiteContentProvider>
      </ServicesProvider>
    </>
  )
}

export default App
