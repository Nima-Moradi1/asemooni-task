import SignupForm from '@/components/(auth)/SignupForm'
import React from 'react'

const SignupPage = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full mt-10'>
        <h1 className='h1'>نام نویسی در آسمونی</h1>
        <SignupForm />
    </div>
  )
}

export default SignupPage