import { useCallback, useEffect, useMemo, useState } from 'react'
import { services as localServices } from '../data/siteData'
import { fetchBackendServices } from '../lib/servicesApi'
import { ServicesContext } from './servicesContext'

export function ServicesProvider({ children }) {
  const [services, setServices] = useState(localServices)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const dismissError = useCallback(() => {
    setError(null)
  }, [])

  const refreshServices = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const backendServices = await fetchBackendServices()
      setServices(backendServices.length ? backendServices : localServices)
    } catch (requestError) {
      setError(requestError)
      setServices(localServices)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshServices()
  }, [refreshServices])

  const serviceOptions = useMemo(
    () =>
      services
        .map((item) => item.title)
        .filter(Boolean)
        .sort((left, right) => left.localeCompare(right))
        .map((title) => ({ label: title, value: title })),
    [services],
  )

  const value = useMemo(
    () => ({
      services,
      serviceOptions,
      isLoading,
      error,
      dismissError,
      refreshServices,
    }),
    [dismissError, error, isLoading, refreshServices, serviceOptions, services],
  )

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>
}
