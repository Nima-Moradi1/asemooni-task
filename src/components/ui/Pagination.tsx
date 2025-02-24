'use client'

import generatePagination from "@/utils/GeneratePagination";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation"

export const Pagination = ({totalPages , limit, page}: {totalPages : number , limit : number , page : number}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const currentPage = page || 1
    const itemsPerPage = limit

    const createPageUrl = (pageNumber : number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page',pageNumber.toString())
        params.set('limit',itemsPerPage.toString())
        return `${pathname}?${params.toString()}`
    }

const allPages = generatePagination(currentPage, totalPages) ;

return (
    <div className="inline-flex">
        <PaginationArrow 
        direction= 'left'
        href={createPageUrl(currentPage - 1)}
        isDisabled= {currentPage <= 1}
        />
        <div className="flex -space-x-px">
            {allPages.map((page : number | string ,index : number)=> {
               let position;
               if(index === 0) position = 'first'
               if(index === allPages.length - 1) position = 'last'
               if(allPages.length === 1) position = 'single'
               if(page === "...") position = 'middle'
               return (
                <PaginationNumber 
                key={`${page}-${index}`}
                href={createPageUrl(page)}
                page = {page}
                position={position}
                isActive={currentPage === page}/>
               )
            })}
        </div>
        <PaginationArrow 
        direction= 'right'
        href={createPageUrl(currentPage + 1)}
        isDisabled= {currentPage >= totalPages}/>
    </div>
)
}

export function PaginationArrow({direction, href, isDisabled} : {direction : string, href : string, isDisabled : boolean}) {
    const className = classNames(
        'flex size-10 items-center justify-center border rounded-md text-primary' , 
        {
            ' text-primary border-primary' : !isDisabled,
            'border-secondary-foreground/30 text-secondary-foreground/50' : isDisabled, 
            'mr-2 md:mr-4' : direction === 'right',
            'ml-2 md:ml-4' : direction === 'left',
        }
    );

    const icon = direction === 'right' ? <ArrowLeftIcon className="size-4" /> : <ArrowRightIcon className="size-4" />
    return isDisabled ? 
    <>
    <div className={className}>
        {icon}
    </div>
    </> 
    : <>
    <Link href={href} className={className}>
    {icon}
    </Link>
    </> 
    }

function PaginationNumber({href, page, position, isActive} : {href : string, page : number | string, position? : string, isActive : boolean}) {
    const className = classNames(
        'flex items-center justify-center text-sm border border-secondary-foreground/20 px-4 py-2 text-secondary-foreground',
        {
            'rounded-r-md' : position === 'first' || position === 'single' ,
            'rounded-l-md' : position === 'last' || position === 'single',
            'hover:bg-secondary-foreground/10' : !isActive && position !== 'middle',
            'text-secondary-foreground' : position === 'middle' , 
            'z-10 bg-primary !border-primary text-white' : isActive
        }
    )
    return isActive || position === 'middle' ? (
        <div className={className}>
            {page}
        </div>
    ) : (
        <Link href={href} className={className}>
        {page}
        </Link>
    )
}