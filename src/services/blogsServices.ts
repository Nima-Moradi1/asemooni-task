// داخل تسک نوشته بود این قسمت حتما با خود <فچ> نکست انجام بشه 
'use server'
import { cookies } from "next/headers"

 

export async function getBlogsApi(page = 1,limit = 12) {
    const cookie = await cookies()
    const token = cookie.get('token')?.value
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${page}/${limit}` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    return response.json()
}