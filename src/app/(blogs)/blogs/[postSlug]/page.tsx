import React from 'react'

interface Params {
  postSlug: string;
}

const SinglePostPage = async ({params}: { params: Params }) => {
    const {postSlug} = await params || {}
  return (
    <div>
        <p className='text-destructive'
        >با توجه به اینکه API در جهت دریافت تک پست توی تست ارسال نشده صرفا اینجا یه متن نمایشی همراه با آیدی پست نمایش داده میشود.</p>
       <p className='flex items-center justify-center md:w-2/3 mx-auto text-lg my-5 gap-3 border p-3 rounded-xl shadow-inner'>
        <span>نمایش اطلاعات برای پست با شناسه : </span>
        <span>{postSlug}</span>
        </p> 
    </div>
  )
}

export default SinglePostPage