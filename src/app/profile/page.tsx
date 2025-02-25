'use client'
import React from 'react'
import { useUserStore } from '../../store/authStore'
import Image from 'next/image'

const UserProfilePage = () => {
  const user = useUserStore((state) => state.user)
  const userImage = `${process.env.NEXT_PUBLIC_BASE_URL}${user?.image}`
  return (
    <div>
      <Image src={userImage || ''} alt='profileImage' width={250} height={350}/>
    </div>
  )
}

export default UserProfilePage