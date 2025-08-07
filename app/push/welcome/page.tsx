"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { createOrganization } from '@/services/auth/createOrg'

const WelcomePage: React.FC = () => {
    const router = useRouter()
    const [status, setStatus] = useState<'idle' | 'creating' | 'success' | 'error'>('idle')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const initializeOrg = async () => {
            setStatus('creating')

            const result = await createOrganization()

            if (result.success && result.orgId) {
                setStatus('success')
                router.push(`/push/org/${result.orgId}`)
            }
            else {
                setStatus('error')
                setError(result.error || 'Failed to create organization')
            }
        }

        initializeOrg()
    }, [router])

    const handleRetry = () => {
        setStatus('idle')
        setError(null)
        // Trigger useEffect again
        window.location.reload()
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
                {status === 'creating' && (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Setting up your organization...</h2>
                        <p className="text-gray-600">This will only take a moment.</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="text-red-500 text-4xl mb-4">⚠️</div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Setup Failed</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button
                            onClick={handleRetry}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default WelcomePage