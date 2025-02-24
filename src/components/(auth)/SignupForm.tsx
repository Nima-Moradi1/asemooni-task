/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import RHFTextField from '../ui/RHFTextField'
import FileInput from '../ui/FileInput'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { SignupSchema } from '@/validation/schemas'
import { yupResolver } from "@hookform/resolvers/yup";
import Link from 'next/link'
import { useUserSignup } from '@/hooks/React-Query/useSignup'
import SpinnerMini from '../ui/SpinnerMini'
import { useAuthStore, useUserStore } from '../../store/authStore'
import { useRouter } from 'next/navigation'

export interface SignupProps {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
    image: string
}

const SignupForm = () => {

    const {isSigning,userSignup} = useUserSignup()
    const router = useRouter()
    const [image , setImage] = React.useState<string | null>(null)

    const {register, control, formState : {errors} , handleSubmit} = useForm<SignupProps>({
        mode:'onTouched' ,
        resolver : yupResolver(SignupSchema)
    })

    const signupHandler = (data:SignupProps) => {
        const newData = {
            ...data,
            image: image || ''
        }
       try {
       const response = userSignup(newData, {
        onSuccess : (data : {token:string, data:SignupProps}) => {
            const userToken = data?.token
            useAuthStore.getState().setToken(userToken);
            useUserStore.getState().setUser(data.data);
            router.push('/')
        }
       })
        console.log(response);
       } catch (error : {response : {data : {message : string}}} | any) {
        const errorMsg = error?.response?.data?.message ;
        console.log(errorMsg);
       }
    }

  return (
    <div className='w-2/3 flex flex-col items-center justify-center'>
        <form className='form grid grid-cols-1 md:grid-cols-2 gap-4 '
         onSubmit={handleSubmit(signupHandler)}>
            <RHFTextField name='firstName' label='نام' register={register} errors={errors} isRequired/>
            <RHFTextField name='lastName' label='نام خانوادگی' register={register} errors={errors} isRequired/>
            <RHFTextField dir='ltr' name='email' label='ایمیل' register={register} errors={errors} isRequired/>
            <RHFTextField dir='ltr' name='password' label='پسورد' register={register} errors={errors} isRequired/>
            <RHFTextField dir='ltr' name='phoneNumber' label='شماره همراه' register={register} errors={errors} isRequired/>
            <div className='md:mt-8'>
            <Controller
        control={control}
        name="image"
        rules={{ required: "عکس کاور پست الزامی است" }}
        render={({field : {value,onChange}}: { field: { value: string | any, onChange: (file: File | null) => void } })=> {
                return <>
                <FileInput id="image" label="انتخاب عکس" name="image" 
                isRequired
                errors={errors}
                isImageUploaded={image? true : false}
                value={value?.fileName} onChange={(e : any)=> {
                    const file = e?.target.files[0] 
                    onChange(file)
                    setImage(URL.createObjectURL(file))
                }}/>
                </>
            }}/>   
            </div>
                     
            <Button disabled={isSigning || Object.keys(errors).length > 0}
            type='submit' className='w-full md:col-span-2 mt-5'>
                {isSigning ? <SpinnerMini /> : 'ثبت نام'}
            </Button>
        </form>
        <div className='flex gap-5 mt-10 border-b p-3 rounded-xl'>
            <p>عضو سایت هستید ؟‌</p>
            <Link className='text-primary hover:underline'
            href='/auth/login'>ورود به حساب کاربری</Link>
        </div>
    </div>
  )
}

export default SignupForm