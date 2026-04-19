import { useContext } from 'react'
import { SiteContentContext } from '../context/siteContentContext'

function useSiteContent() {
  const context = useContext(SiteContentContext)

  if (!context) {
    throw new Error('useSiteContent must be used inside SiteContentProvider')
  }

  return context
}

export default useSiteContent
