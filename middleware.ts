// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify, createRemoteJWKSet, errors as joseErrors } from 'jose'

const region = process.env.MY_AWS_REGION;
const userPoolId = process.env.COGNITO_USER_POOL_ID; // prefer NON-public var; it's not secret but clearer
if (!region || !userPoolId) {
    // Log once at startup so you catch bad prod config immediately
    console.error('Missing MY_AWS_REGION or COGNITO_USER_POOL_ID in env');
}

const issuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;
const jwks = createRemoteJWKSet(
    new URL(`${issuer}/.well-known/jwks.json`)
);

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, jwks, {
            issuer,
            // If you use a specific client app, set audience:
            // audience: process.env.COGNITO_APP_CLIENT_ID,
            clockTolerance: 60, // handle minor skew in Lambda/CloudFront
        });

        // Extra guard: ensure it’s an ID token
        if (payload.token_use && payload.token_use !== 'id') return null;

        return payload;
    } catch (err) {
        // Helpful diagnostics in prod logs
        const name = (err as Error).name;
        if (name === joseErrors.JWTClaimValidationFailed.name ||
            name === joseErrors.JWSSignatureVerificationFailed.name) {
            console.warn('JWT verify failed:', name);
        } else {
            console.error('JWT verification error:', err);
        }
        return null;
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


