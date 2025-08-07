import { getUserFromRequest } from './getUserFromRequest'
import { NextRequest, NextResponse } from 'next/server'

export async function requireRole(req: NextRequest, role: string) {
    const user = await getUserFromRequest(req)

    if (!user) {
        return {
            authorized: false,
            response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
        }
    }

    if (!user.roles.includes(role)) {
        return {
            authorized: false,
            response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
        }
    }

    return { authorized: true, user }
}
