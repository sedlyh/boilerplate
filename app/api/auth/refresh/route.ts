import { NextRequest, NextResponse } from 'next/server';
import { InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { cognito } from '@/lib/auth/cognito';

// Add explicit declaration
console.log('🔥 Refresh route file loaded');


export const POST = async (req: NextRequest): Promise<NextResponse> => {
    console.log('🔥 POST handler called');
    const refreshToken = req.cookies.get('refreshToken')?.value;
    if (!refreshToken) {
        return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    try {
        const command = new InitiateAuthCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthFlow: 'REFRESH_TOKEN_AUTH',
            AuthParameters: {
                REFRESH_TOKEN: refreshToken,
            },
        });

        const result = await cognito.send(command);
        const tokens = result.AuthenticationResult;

        if (!tokens) {
            throw new Error('AuthenticationResult is undefined');
        }

        const response = NextResponse.json({ message: 'Token refreshed' });

        response.cookies.set('idToken', tokens.IdToken!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: tokens.ExpiresIn || 3600,
        });

        response.cookies.set('accessToken', tokens.AccessToken!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: tokens.ExpiresIn || 3600,
        });

        return response;
    } catch (err) {
        console.error('Refresh failed:', err);
        return NextResponse.json({ error: 'Refresh failed' }, { status: 401 });
    }
};