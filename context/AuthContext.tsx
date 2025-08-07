"use client"
import { createContext, useEffect, useState } from 'react'

interface AuthContextType {
    roles: string[]
    email: string | null
    loading: boolean
    error: boolean
}

export const AuthContext = createContext<AuthContextType>({
    roles: [],
    email: null,
    loading: true,
    error: false,
})

// @ts-ignore
export const AuthProvider = ({ children }) => {
    const [roles, setRoles] = useState<string[]>([])
    const [email, setEmail] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await fetch('/api/protected/me', { credentials: 'include' })

                if (res.status === 401) {
                    const errorData = await res.json()

                    // Check if it's "Missing access token" from middleware
                    if (errorData.error === 'Missing access token') {
                        console.log('No token found, trying refresh anyway...')
                    }

                    const refresh = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' })
                    if (!refresh.ok) throw new Error('Refresh failed')

                    // Try /me again after refresh
                    const retry = await fetch('/api/protected/me', { credentials: 'include' })
                    // ... rest of your logic

                    if (!retry.ok) throw new Error('Retry failed')

                    const data = await retry.json()
                    setRoles(data.roles || [])
                    setEmail(data.email)
                    setError(false)
                } else {
                    const data = await res.json()
                    setRoles(data.roles || [])
                    setEmail(data.email)
                    setError(false)
                }
            } catch (err) {
                setRoles([])
                setEmail(null)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchMe()
    }, [])

    return (
        <AuthContext.Provider value={{ roles, email, loading, error }}>
            {children}
        </AuthContext.Provider>
    )
}
