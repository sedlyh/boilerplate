"use client"

import {useEffect} from "react";

const REFRESH_INTERVAL = 55 * 60 * 1000

export default function AuthSessionManager() {
    useEffect(() => {
        const refreshSession = async () => {
            const response = await fetch("/api/auth/refresh")

            if (!response?.ok) {
                console.error("Something went wrong.")
                window.location.href = "/auth/login"
            }
        }

        const interval = setInterval(refreshSession, REFRESH_INTERVAL)

        return () => clearInterval(interval)
    }, [])

    return null

}