'use server';
import 'server-only';
import { cookies } from 'next/headers';
import {verifyToken} from "@/lib/auth/verifyToken";

export type ServerUser = {
    id: string;
    email: string;
    roles: string[];
};

export async function getServerUser(): Promise<ServerUser | null> {
    // Read the ID token the same way your API/middleware does
    const token = (await cookies()).get('idToken')?.value;
    if (!token) return null;

    const payload = await verifyToken(token).catch(() => null);
    if (!payload) return null;

    const groups = payload['cognito:groups'];
    const roles =
        Array.isArray(groups) ? groups :
            typeof groups === 'string' ? [groups] : [];

    return {
        id: payload.sub as string,
        email: (payload.email as string) ?? '',
        roles,
    };
}
