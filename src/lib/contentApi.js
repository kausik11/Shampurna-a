import {
  beforeAfterCases as localBeforeAfterCases,
  faqs as localFaqs,
  resultsGallery as localResultsGallery,
  testimonials as localTestimonials,
  videoTestimonials as localVideoTestimonials,
} from '../data/siteData'
import apiClient from './apiClient'

const firstText = (...values) => {
  const value = values.find((item) => `${item ?? ''}`.trim())

  return value === undefined ? '' : `${value}`.trim()
}

const createHandle = (name) =>
  `@${firstText(name, 'guest')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/(^\.|\.$)+/g, '')}`

export const normalizeTestimonials = (items) =>
  Array.isArray(items)
    ? items
        .map((item) => ({
          name: firstText(item.fullName, item.name),
          username: firstText(item.username, createHandle(item.fullName || item.name)),
          tag: firstText(item.tag, item.rating ? `${item.rating}/5 rating` : 'Client Review'),
          country: firstText(item.country, 'India'),
          image: firstText(item.imageUrl, item.image),
          quote: firstText(item.message, item.quote),
        }))
        .filter((item) => item.name && item.quote)
    : []

export const normalizeVideoTestimonials = (items) =>
  Array.isArray(items)
    ? items
        .map((item) => ({
          profileImage: firstText(item.profileImage, item.image),
          name: firstText(item.name),
          feedback: firstText(item.feedback, item.message),
          mainImage: firstText(item.mainImage, item.bannerImage, item.image),
          videoUrl: firstText(item.videoUrl, item.videoLink),
          facebookUrl: firstText(item.facebookUrl, item.videoLink),
        }))
        .filter((item) => item.name && item.feedback && item.mainImage)
    : []

export const normalizeFaqs = (items) =>
  Array.isArray(items)
    ? items
        .map((item) => ({
          question: firstText(item.question),
          answer: firstText(item.answer),
        }))
        .filter((item) => item.question && item.answer)
    : []

export const normalizeBeforeAfterCases = (items) =>
  Array.isArray(items)
    ? items
        .map((item) => ({
          category: firstText(item.category, item.tag),
          beforeImage: firstText(item.beforeImage, item.beforeimage),
          afterImage: firstText(item.afterImage, item.afterimage),
        }))
        .filter((item) => item.category && item.beforeImage && item.afterImage)
    : []

export const normalizeGalleryItems = (items) =>
  Array.isArray(items)
    ? items
        .map((item, index) => {
          const title = firstText(item.title, item.tag, `Gallery image ${index + 1}`)

          return {
            tag: firstText(item.tag, 'Gallery'),
            title,
            description: firstText(item.description, 'A curated Shampurna visual from the clinic gallery.'),
            image: firstText(item.image, item.imageUrl),
            src: firstText(item.image, item.imageUrl),
            label: title,
            fileName: firstText(item._id, item.id, title),
          }
        })
        .filter((item) => item.image)
    : []

const readSettled = (result, normalizer, fallback) => {
  if (result.status !== 'fulfilled') {
    return fallback
  }

  const normalized = normalizer(result.value.data)

  return normalized.length ? normalized : fallback
}

export async function fetchSiteContent() {
  const [
    testimonialsResult,
    videoTestimonialsResult,
    resultImagesResult,
    faqsResult,
    galleryResult,
  ] = await Promise.allSettled([
    apiClient.get('/api/testimonials'),
    apiClient.get('/api/video-testimonials'),
    apiClient.get('/api/result-images'),
    apiClient.get('/api/faqs'),
    apiClient.get('/api/gallery'),
  ])

  const errors = [
    testimonialsResult,
    videoTestimonialsResult,
    resultImagesResult,
    faqsResult,
    galleryResult,
  ]
    .filter((result) => result.status === 'rejected')
    .map((result) => result.reason)

  const galleryItems = readSettled(galleryResult, normalizeGalleryItems, [])
  const beforeAfterCases = readSettled(resultImagesResult, normalizeBeforeAfterCases, localBeforeAfterCases)

  return {
    testimonials: readSettled(testimonialsResult, normalizeTestimonials, localTestimonials),
    videoTestimonials: readSettled(videoTestimonialsResult, normalizeVideoTestimonials, localVideoTestimonials),
    beforeAfterCases,
    faqs: readSettled(faqsResult, normalizeFaqs, localFaqs),
    resultsGallery: galleryItems.length ? galleryItems : localResultsGallery,
    galleryItems,
    errors,
  }
}

export function submitNewsletterSubscription(email) {
  return apiClient.post('/api/newsletter', { email })
}
