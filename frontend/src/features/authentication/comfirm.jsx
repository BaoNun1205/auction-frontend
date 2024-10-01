import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useConfirmAccount } from '~/hooks/authHook'

const ConfirmAccount = () => {
  const [message, setMessage] = useState('')
  const [token, setToken] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { mutate: confirmAccount, isLoading: isConfirming } = useConfirmAccount();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token')
    console.log(token)
    setToken(token)
  }, [location])

  const handleConfirm = async () => {
    if (token) {
      confirmAccount(token, {
        onSuccess: (data) => {
          console.log(data.code);
          if (data.code === 200) {
            setMessage('Account confirmed successfully!');
            // Chuyển hướng đến trang đăng nhập hoặc trang chủ
            setTimeout(() => navigate('/authentication'), 3000);
          } else {
            setMessage('Failed to confirm account. Please try again.');
          }
        },
        onError: (error) => {
          setMessage('An error occurred. Please try again.');
        }
      });
    } else {
      setMessage('Invalid token.')
    }
  }

  return (
    <div>
      <h1>Confirm Account</h1>
      <p>{message}</p>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  )
}

export default ConfirmAccount