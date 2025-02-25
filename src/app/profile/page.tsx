'use client'
import React from 'react'
import { useUserStore } from '../../store/authStore'
import Image from 'next/image'

const UserProfilePage = () => {
  const user = useUserStore((state) => state.user)
  const userImage = `${process.env.NEXT_PUBLIC_BASE_URL}${user?.image}` || ''
  return (
    <div>
      <h1>
        <span>{user?.firstName} {" "}</span>
        <span>
        عزیز خوش آمدید ❤️
        </span>
      </h1>
        <h1 className='h1 mt-5'>اطلاعات حساب کاربری شما</h1>
      <div className='flex flex-col gap-5 items-center justify-center p-3 border rounded-xl *:border-b'>
        <Image src={userImage || ''} alt='profileImage' width={170} height={150} className='rounded-full border'/>
        <p>نام: {user?.firstName}</p>
        <p>نام خانوادگی: {user?.lastName}</p>
        <p>نام کاربری: {user?.email}</p>
        <p>ایمیل: {user?.email}</p>
        <p>شماره تماس: {user?.phoneNumber}</p>
      </div>
    </div>
  )
}

export default UserProfilePage