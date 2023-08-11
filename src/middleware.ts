import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    const isPublicPath = path === '/login' || path === '/siginup'; // Renamed to isPublicPath
    
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && path) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/signup', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/siginup' // Renamed from 'siginup' to 'signup'
    ]
};
