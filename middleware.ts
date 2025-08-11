// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import {verifyToken} from "@/lib/auth/verifyToken";


export async function middleware(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value

    if (!token) {
        return  NextResponse.redirect(new URL('/auth/login' , req.url))
    }

    try {
        // Optional: verify here for quick rejection (see note below)
        await verifyToken(token)
        return NextResponse.next()
    } catch (err) {
        return new NextResponse('Unauthorized - Invalid token', { status: 401 })
    }
}

/**
 * Configuration object for the middleware.
 * Specifies the routes where the middleware should be applied.
 */
export const config = {
    matcher: ["/push/:path*",
        "/api/org/:path*",
        "/api/protected/:path*",
        '/api/admin/:path*',], // Apply middleware to these routes
};


