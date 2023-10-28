import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

export function isTokenExpired(token: string | undefined) {
    if (token === undefined) return true

    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}

export function middleware(request: NextRequest) {
    if (!request.cookies.has('auth._token.local')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const jwt = request.cookies.get('auth._token.local')?.value.split(' ')[1]

    if (isTokenExpired(jwt)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!login|register|_next/static|_next/image|favicon.ico).*)',
    ]
}