// src/pages/OngoingRedirect.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const OngoingRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/', { state: { scrollTo: 'currentAuction' } })
  }, [navigate])

  return null
}

export default OngoingRedirect
