// src/pages/UpcomingRedirect.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UpcomingRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/', { state: { scrollTo: 'upcoming' } })
  }, [navigate])

  return null
}

export default UpcomingRedirect
