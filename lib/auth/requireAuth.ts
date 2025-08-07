// lib/auth/requireAuth.ts
import { getUserFromRequest } from './getUserFromRequest'
import { NextRequest, NextResponse } from 'next/server'

export function requireAuth(req: NextRequest) {
    const user = getUserFromRequest(req)

    if (!user) {
        return {
            authorized: false,
            response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
        }
    }

    return { authorized: true, user }
}