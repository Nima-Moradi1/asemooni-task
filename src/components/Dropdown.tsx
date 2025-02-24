'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import {Button} from './ui/button'
import { ArrowLeftEndOnRectangleIcon, ChevronDownIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/outline'
import { toPersianDigits } from '@/utils/NumberFormatter'
// import { logoutApi } from '@/services/authServices'
// import toast from 'react-hot-toast'
import Link from 'next/link'
import { SignupProps } from './(auth)/SignupForm'
import { useAuthStore, useUserStore } from '../store/authStore'
import { useRouter } from 'next/navigation'
const Dropdown = ({user}:{user?:SignupProps | null}) => {

  const router = useRouter();
  const clearToken = useAuthStore((state) => state.clearToken);
  const clearUser = useUserStore((state) => state.clearUser);

  const logoutHandler =  () => {
    try {
      clearToken();
      clearUser();
      router.push('/auth/login');
    } catch (error) {
      console.log(error);
    }
  }

  if(!user) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='rounded-2xl'>
        <Button variant="outline">
            <UserIcon className='size-4'/>
            <ChevronDownIcon className='size-2'/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-end w-56 backdrop-blur-lg md:ml-10 ml-2 mt-1 rounded-xl" >
        <DropdownMenuLabel>
          <div className='flex items-center  py-2 gap-3 border-b w-full'>
            <div className='flex flex-col items-end'>
              <span>{user?.firstName}</span>
              <span className='text-xs text-secondary-500'>{toPersianDigits(user?.phoneNumber)}</span>
            </div>
            <div className='bg-secondary-100 size-8 flex items-center justify-center leading-none border border-secondary-200 p-3 rounded-full'
            >
              <span>
              {(user?.firstName).charAt(0)}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link className='w-full'
         href={'/profile'}>
        <DropdownMenuItem className='w-full flex-row-reverse cursor-pointer mb-1 hover:bg-secondary-100/30'>
            <UserCircleIcon />
            <span>
            {'پروفایل'}
            </span>
          </DropdownMenuItem>
        </Link>
          <DropdownMenuItem
          onClick={logoutHandler}
          className='w-full flex-row-reverse cursor-pointer hover:bg-secondary-100/30 hover:text-error'
          >
            <ArrowLeftEndOnRectangleIcon stroke='red'/>
            <span>خروج از حساب</span>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
 
}

export default Dropdown