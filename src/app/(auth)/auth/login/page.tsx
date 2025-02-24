import LoginForm from '@/components/(auth)/LoginForm'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full mt-10'>
      <h1 className='h1'>ورود به حساب آسمونی</h1>
      <LoginForm />
      </div>
  )
}

export default LoginPage