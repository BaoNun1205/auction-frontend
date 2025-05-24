import { useNavigate } from 'react-router-dom'

export const useCustomNavigate = () => {
  const navigate = useNavigate()

  const handleNavigate = (path, state = {}) => {
    navigate(path, { state })
  }

  return { handleNavigate }
}
