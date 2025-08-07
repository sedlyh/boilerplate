// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify, createRemoteJWKSet } from 'jose'

const jwks = createRemoteJWKSet(
    new URL(`https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`)
)

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, jwks, {
            issuer: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
        })
        return payload
    } catch (err) {
        console.error('JWT verification failed:', err)
        return null
    }
}

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


