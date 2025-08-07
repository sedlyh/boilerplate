import { verifyToken } from '@/middleware'
import { NextRequest } from 'next/server'

export async function getUserFromRequest(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value

    if(!token) throw new Error("No Token")

    const payload = await verifyToken(token)

    return {
        id: payload?.sub,
        email: payload?.email,
        roles: Array.isArray(payload?.['cognito:groups'])
            ? payload?.['cognito:groups']
            : typeof payload?.['cognito:groups'] === 'string'
                ? [payload?.['cognito:groups']]
                : []
    }
}