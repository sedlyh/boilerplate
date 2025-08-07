import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/requireAuth'

export async function GET(req: NextRequest) {
    const { authorized, user, response } = requireAuth(req)
    if (!authorized) return response


    if (req.headers.get('x-token-invalid')) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
    }

    return NextResponse.json({
        id: user?.id,
        email: user?.email,
        roles: user?.roles,
    })
}
