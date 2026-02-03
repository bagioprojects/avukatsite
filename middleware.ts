import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 1. Skip middleware for static files and next internals
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api/auth') || // Allow auth endpoints
        pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    // 2. Protect Admin Routes
    if (pathname.startsWith('/admin')) {
        // Allow login page
        if (pathname === '/admin/login') {
            return NextResponse.next()
        }

        // Check for session token (simplified check for middleware)
        // Note: For full security, use next-auth/middleware or getToken
        const token = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token')

        if (!token) {
            const loginUrl = new URL('/admin/login', request.url)
            return NextResponse.redirect(loginUrl)
        }
    }

    // Security headers
    const response = NextResponse.next()

    // Add security headers
    response.headers.set('X-DNS-Prefetch-Control', 'on')
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    response.headers.set('X-Frame-Options', 'SAMEORIGIN')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
