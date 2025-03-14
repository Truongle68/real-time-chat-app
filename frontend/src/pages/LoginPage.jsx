import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'

const LoginPage = () => {

  const {authUser, checkAuth} = useAuthStore()
      
      useEffect(() => {
          checkAuth
      },[checkAuth])

    console.log({authUser})

  return (
    <div>LoginPage</div>
  )
}

export default LoginPage