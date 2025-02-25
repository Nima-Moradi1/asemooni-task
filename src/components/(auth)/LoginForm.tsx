'use client'

import React from 'react'
import RHFTextField from '../ui/RHFTextField'
import { Button } from '../ui/button'
import { LoginSchema } from '@/validation/schemas'
import { yupResolver } from "@hookform/resolvers/yup";
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { useUserLogin } from '@/hooks/React-Query/useLogin'
import SpinnerMini from '../ui/SpinnerMini'
import { useAuthStore, useUserStore } from '../../store/authStore'
import { SignupProps } from './SignupForm'
import { useRouter } from 'next/navigation'

interface LoginProps {
    email: string,
    password: string,
}

const LoginForm = () => {

    const router = useRouter()
    const {isLogging,userLogin} = useUserLogin()

    const {register, formState : {errors} , handleSubmit} = useForm<LoginProps>({
        mode:'onTouched' ,
        resolver : yupResolver(LoginSchema)
    })

    const loginHandler = (data:LoginProps) => {
       try {
        userLogin(data,  {
                onSuccess : (data : {token:string, data:SignupProps}) => {
                    const userToken = data?.token
                    useAuthStore.getState().setToken(userToken);
                    useUserStore.getState().setUser(data.data);
                    router.push('/')
                }
               })
       } catch (error) {
        console.log(error);
       }
    }

  return (
    <div className='w-2/3 flex flex-col items-center justify-center'>
        <form className='form grid grid-cols-1 gap-4 '
         onSubmit={handleSubmit(loginHandler)}>
            <RHFTextField dir='ltr' name='email' label='ایمیل' register={register} errors={errors} isRequired/>
            <RHFTextField dir='ltr' name='password' label='پسورد' register={register} errors={errors} isRequired/>             
            <Button disabled={Object.keys(errors).length > 0 || isLogging} type='submit' className='w-full mt-5'>
                {isLogging ? <SpinnerMini/> : 'ورود به حساب'}
            </Button>
        </form>
        <div className='flex text-sm md:text-base gap-5 mt-10 border-b p-3 rounded-xl'>
            <p>عضو سایت نیستید ؟‌</p>
            <Link className='text-primary hover:underline'
            href='/auth/signup'>نام نویسی</Link>
        </div>
    </div>
  )
}

export default LoginForm

