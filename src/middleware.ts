import { NextResponse } from "next/server";

interface Request {
    nextUrl: {
        pathname: string;
    };
    cookies: {
        get: (name: string) => { value: string } | undefined;
    };
    url: string;
}

export const middleware = (request: Request) => {
    const pathname = request.nextUrl.pathname;
    const url = request.url;
    const userToken = request.cookies.get('token')?.value;
    if(pathname === '/' && userToken) {
        return NextResponse.redirect(new URL('/blogs' , url))
    }
    if (pathname.startsWith('/auth') && userToken) {
        return NextResponse.redirect(new URL('/' , url))
}
if (!userToken && pathname.startsWith('/') && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login' , url))
}
return NextResponse.next();

};



export const config = {
    matcher : ["/auth/:path*" , "/"]
}