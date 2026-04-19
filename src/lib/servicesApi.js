import axios from 'axios'
import { services as localServices } from '../data/siteData'

export const SERVICES_API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://sampurna-backend.vercel.app'
).replace(/\/$/, '')

export const createServiceSlug = (value) =>
  `${value ?? ''}`
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

const normalizeTitle = (value) =>
  `${value ?? ''}`
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '')

const firstText = (...values) => {
  const value = values.find((item) => `${item ?? ''}`.trim())

  return value === undefined ? '' : `${value}`.trim()
}

const firstValue = (...values) => values.find((item) => item !== undefined && item !== null && item !== '')

const formatServicePrice = (value) => {
  const price = firstText(value)

  if (!price || /^rs\.?\s/i.test(price) || price.startsWith('₹')) {
    return price
  }

  return /^[0-9][0-9,\s.+-]*$/.test(price) ? `Rs. ${price}` : price
}

const findLocalService = (service) =>
  localServices.find(
    (item) =>
      normalizeTitle(item.title) === normalizeTitle(service?.title) ||
      normalizeTitle(item.slug) === normalizeTitle(service?.slug),
  )

const getImageUrl = (value) => {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return firstText(value.url, value.secure_url, value.src, value.path)
}

const normalizeResult = (result, service, localService, index) => {
  const localResult = localService?.results?.[index] || localService?.results?.[0] || {}

  return {
    title: firstText(result?.title, localResult.title, `${service.title} result`),
    description: firstText(result?.description, result?.shortDescription, localResult.description),
    beforeImage: firstText(
      getImageUrl(result?.beforeImage),
      getImageUrl(result?.beforeimage),
      getImageUrl(result?.before_image),
      getImageUrl(result?.before),
      localResult.beforeImage,
    ),
    afterImage: firstText(
      getImageUrl(result?.afterImage),
      getImageUrl(result?.afterimage),
      getImageUrl(result?.after_image),
      getImageUrl(result?.after),
      localResult.afterImage,
    ),
  }
}

export const normalizeBackendService = (service) => {
  const localService = findLocalService(service) || {}
  const title = firstText(service?.title, localService.title)
  const slug = createServiceSlug(firstText(service?.slug, title))
  const backendResults = Array.isArray(service?.results)
    ? service.results
    : [service?.result].filter(Boolean)
  const results = backendResults.length
    ? backendResults.map((result, index) => normalizeResult(result, { title }, localService, index))
    : localService.results || []

  return {
    ...localService,
    ...service,
    title,
    slug,
    href: `/services/${slug}`,
    image: firstText(
      getImageUrl(service?.image),
      getImageUrl(service?.serviceImage),
      getImageUrl(service?.imageUrl),
      getImageUrl(service?.thumbnail),
      getImageUrl(service?.photo),
      localService.image,
    ),
    imageAlt: firstText(service?.imageAlt, service?.alt, `${title} treatment image`),
    focus: firstText(service?.focus, service?.tag, localService.focus),
    description: firstText(service?.description, service?.shortDescription, localService.description),
    detailDescription: firstText(
      service?.detailDescription,
      service?.longDescription,
      service?.longdescription,
      localService.detailDescription,
    ),
    priceLabel: firstText(service?.priceLabel, localService.priceLabel),
    priceNote: firstText(service?.priceNote, localService.priceNote),
    priceValue: formatServicePrice(firstValue(service?.priceValue, service?.price, localService.priceValue)),
    results,
    faqs: Array.isArray(service?.faqs) && service.faqs.length ? service.faqs : localService.faqs || [],
  }
}

export const normalizeBackendServices = (services) =>
  Array.isArray(services)
    ? services.map(normalizeBackendService).filter((service) => service.title)
    : []

export async function fetchBackendServices() {
  const response = await axios.get(`${SERVICES_API_BASE_URL}/api/services`)

  return normalizeBackendServices(response.data)
}
