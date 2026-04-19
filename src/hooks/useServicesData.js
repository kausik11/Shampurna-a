import { useEffect, useState } from 'react'
import { services as localServices } from '../data/siteData'
import { fetchBackendServices } from '../lib/servicesApi'

function useServicesData() {
  const [services, setServices] = useState(localServices)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadServices = async () => {
      try {
        const backendServices = await fetchBackendServices()

        if (isMounted && backendServices.length) {
          setServices(backendServices)
        }
      } catch {
        if (isMounted) {
          setServices(localServices)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadServices()

    return () => {
      isMounted = false
    }
  }, [])

  return { services, isLoading }
}

export default useServicesData
