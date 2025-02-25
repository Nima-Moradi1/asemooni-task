/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useRef } from 'react'
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
import { useImageUpload } from '@/hooks/React-Query/useImageUplaod'
import Image from 'next/image'
import { ArrowRightIcon, EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'

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
    const {isUploading,uploadImage} = useImageUpload()
    const [image , setImage] = React.useState(null)
    const [step , setStep] = React.useState<number>(1)
    const [preview, setPreview] = React.useState<string | null>(null)
    const [showPassword, setShowPassword] = React.useState(false);
    const [phase2Data,setPhase2Data] = React.useState<Partial<SignupProps>>({})
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleRemoveImage = () => {
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };

    const {register, control, formState : {errors} , handleSubmit} = useForm<SignupProps>({
        mode:'onTouched' ,
        resolver : yupResolver(SignupSchema(step) as any)
    })
    const uploadHandler = () => {
        const formData = new FormData()
        if (image) {
            formData.append('image', image)
        }
        try {
            uploadImage(formData, {
                onSuccess : (data) => {
                    const thumbnail = data?.thumbnail
                   const signupData = {
                          ...phase2Data,
                          image: thumbnail || ''
                   }
                     if (signupData.firstName && signupData.lastName && signupData.email && signupData.password && signupData.phoneNumber) {
                         signupHandler(signupData as SignupProps)
                     } else {
                         console.error("خطا در دریافت تمام اطلاعات ثبت نام کاربر", signupData);
                     }
                }
            })
        } catch (error) {
            console.log(error);
        }

    }

    const signupHandler = (data:SignupProps) => {
       try {
        userSignup(data, {
        onSuccess : (data : {token:string, data:SignupProps}) => {
            const userToken = data?.token
            useAuthStore.getState().setToken(userToken);
            useUserStore.getState().setUser(data.data);
            window.location.href = '/'
        }
       })
       } catch (error : {response : {data : {message : string}}} | any) {
        const errorMsg = error?.response?.data?.message ;
        console.log(errorMsg);
       }
    }
    const step2Handler = (data:any) => {
        setStep(step + 1)
        setPhase2Data(data)
        console.log(phase2Data);
    }
    const moveBack = () => {
        setStep(step - 1)
    }

  return (
    <>
    <div className='w-2/3 flex flex-col items-center justify-center -mt-5 md:mt-0'>
      {step === 1 ? 
      <div className='w-full flex flex-col items-center justify-center'>
                <h1 className='h1 md:mb-16'>نام نویسی در آسمونی</h1>
      <form className='form'
         onSubmit={handleSubmit(()=>setStep(step + 1))}>
            <RHFTextField
             dir='ltr' name='phoneNumber' label='شماره همراه' register={register} errors={errors} isRequired/>      
            <Button
            type='submit' className='w-full mt-5'>
                {isSigning ? <SpinnerMini /> : 'مرحله بعد'}
            </Button>
        </form>
      </div> 
      : step === 2 ? 
      <>
      <div className='w-full'>
      <div className='w-full mb-10 -mr-10 lg:mr-0'>
        <Button variant='ghost' size='icon' onClick={moveBack} >
            <ArrowRightIcon />
        </Button>
    </div>
        <form className='form w-full' onSubmit={handleSubmit(step2Handler)}>
        <RHFTextField name='firstName' label='نام' register={register} errors={errors} isRequired/>
            <RHFTextField name='lastName' label='نام خانوادگی' register={register} errors={errors} isRequired/>
            <RHFTextField dir='ltr' name='email' label='ایمیل' register={register} errors={errors} isRequired/>
            <div className='relative w-full '>
            <RHFTextField type={showPassword ? "text" : "password"}
             dir='ltr' name='password' label='پسورد' register={register} errors={errors} isRequired/>
             <Button
             type='button'
             onClick={()=> setShowPassword(!showPassword)} size='icon' variant='ghost'
             className={`${ errors['password'] ? "bottom-7 right-1" : "bottom-1 right-1 " } absolute flex items-center text-secondary-foreground lg:my-1`}
             >
                {showPassword ? <EyeIcon/> : <EyeSlashIcon/>}
             </Button>
            </div>
            <Button disabled={isSigning || Object.keys(errors).length > 0}
            type='submit' className='w-full md:col-span-2 mt-5 z-50'>
                {isSigning ? <SpinnerMini /> : 'مرحله بعد'}
            </Button>
        </form>
      </div>
      </> 
      : 
      <div className='w-full'>
        <div className='w-full mb-10 -mr-10 lg:mr-0'>
        <Button variant='ghost' size='icon' onClick={moveBack} >
            <ArrowRightIcon />
        </Button>
    </div>
       <div className='md:mt-8'>
        <form onSubmit={handleSubmit(uploadHandler)} className='form grid grid-cols-1 gap-4'>
        <Controller
        control={control}
        name="image"
        rules={{ required: "عکس کاور پست الزامی است" }}
        render={({field : {value,onChange}}: { field: { value: string | any, onChange: (file: File | null) => void } })=> {
                return <>
                <FileInput ref={fileInputRef}
                id="image" label="انتخاب عکس پروفایل" name="image" 
                isRequired
                errors={errors}
                isImageUploaded={preview? true : false}
                value={value?.fileName} onChange={(e : any)=> {
                    const file = e?.target.files[0] 
                    onChange(file)
                    setImage(file)
                    setPreview(URL.createObjectURL(file))
                }}/>
                </>
            }}/> 
            <Button disabled={isUploading || Object.keys(errors).length > 0}
            type='submit' className='w-full md:col-span-2 mt-5'>
                {isUploading ? <SpinnerMini /> : 'آپلود عکس و ثبت نام'}
            </Button>  
        </form>
            </div>
            {preview && <div className="relative aspect-video rounded-lg overflow-hidden mt-10 max-w-sm mx-auto">
                <Image fill src={preview} alt="image" className="object-cover object-center"/>
                <Button variant="destructive" className="size-8 absolute left-0"
                onClick={handleRemoveImage}>
                    <XMarkIcon className="size-7"/>
                </Button>
            </div>}
      </div>
      }
        <div className='flex gap-5 mt-5 border-b p-3 rounded-xl text-sm md:text-base'>
            <p>عضو سایت هستید ؟‌</p>
            <Link className='text-primary hover:underline'
            href='/auth/login'>ورود</Link>
        </div>
    </div>
    </>
    
  )
}

export default SignupForm