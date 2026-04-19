import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  beforeAfterCases,
  faqs,
  resultsGallery,
  testimonials,
  videoTestimonials,
} from '../data/siteData'
import { fetchSiteContent } from '../lib/contentApi'
import { SiteContentContext } from './siteContentContext'

const initialContent = {
  testimonials,
  videoTestimonials,
  beforeAfterCases,
  faqs,
  resultsGallery,
  galleryItems: [],
}

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(initialContent)
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState([])

  const refreshContent = useCallback(async () => {
    setIsLoading(true)
    setErrors([])

    try {
      const nextContent = await fetchSiteContent()
      setContent({
        testimonials: nextContent.testimonials,
        videoTestimonials: nextContent.videoTestimonials,
        beforeAfterCases: nextContent.beforeAfterCases,
        faqs: nextContent.faqs,
        resultsGallery: nextContent.resultsGallery,
        galleryItems: nextContent.galleryItems,
      })
      setErrors(nextContent.errors)
    } catch (error) {
      setErrors([error])
      setContent(initialContent)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const dismissErrors = useCallback(() => {
    setErrors([])
  }, [])

  useEffect(() => {
    refreshContent()
  }, [refreshContent])

  const value = useMemo(
    () => ({
      ...content,
      isLoading,
      errors,
      dismissErrors,
      refreshContent,
    }),
    [content, dismissErrors, errors, isLoading, refreshContent],
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}
