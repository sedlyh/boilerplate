import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/requireAuth'

export async function GET(req: NextRequest) {
    const { authorized, user, response } = await  requireAuth(req)
    if (!authorized || !user) return response

    const resolvedUser = await user


    if (req.headers.get('x-token-invalid')) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
    }

    return NextResponse.json({
        id: resolvedUser.id,
        email: resolvedUser.email,
        roles: resolvedUser.roles,
    })
}
