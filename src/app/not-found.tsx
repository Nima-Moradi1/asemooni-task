import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
   return ( 
    <MaxWidthWrapper>
    <div className='flex items-center justify-center gap-20'>
      <div className='hidden lg:block w-full'>
        <Image alt='404' src='/404.png' width={1000} height={800}/>
      </div>
        <div className="flex flex-col items-center justify-center gap-y-5
     dark:bg-background text-center"> 
    <h2 className="lg:hidden text-9xl font-bold">404</h2>
    <h1 className="text-3xl md:text-4xl font-bold">
      صفحه مورد نظر یافت نشد !
      </h1> 
    <p className="text-xl text-gray-600 dark:text-gray-500 mt-4">
    خطا! صفحه درخواستی شما وجود ندارد! لطفا آدرس صحیح را وارد کنید</p>
      <Link 
      className="mt-6 px-6 py-3 bg-primary text-white rounded-lg
       text-lg hover:bg-primary/75 transition-all duration-300"
      href="/"> 
     رفتن به صفحه اصلی
       </Link> 
       </div> 
    </div>
    </MaxWidthWrapper>
       );
       }