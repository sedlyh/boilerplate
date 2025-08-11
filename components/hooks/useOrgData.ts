import { useState, useEffect, useRef } from 'react'
import { getOrg } from "@/services/dash/getOrg"
import { getUsers } from '@/services/dash/getUsers'
import { getTeams } from "@/services/dash/getTeams"
import { getProject } from "@/services/dash/getProjects"

interface ProjectMetrics {
    total: number
    completedCount: number
    incompleteCount: number
    percentCompleted: number
    teamsWorking: number
}

interface OrgData {
    org: any | null
    users: any[]
    unassignedUsers: any[]
    teams: any[]
    projects: ProjectMetrics
}

const initialProjectMetrics: ProjectMetrics = {
    total: 0,
    completedCount: 0,
    incompleteCount: 0,
    percentCompleted: 0,
    teamsWorking: 0
}

const initialOrgData: OrgData = {
    org: null,
    users: [],
    unassignedUsers: [],
    teams: [],
    projects: initialProjectMetrics
}

export const useOrgData = (orgId: string) => {
    const [data, setData] = useState<OrgData>(initialOrgData)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const hasFetched = useRef(false)
    const currentOrgId = useRef<string | null>(null)

    useEffect(() => {
        // Only fetch if orgId exists and either hasn't been fetched or orgId changed
        if (!orgId || (hasFetched.current && currentOrgId.current === orgId)) {
            return
        }

        const fetchOrgData = async () => {
            // Prevent multiple simultaneous calls
            if (hasFetched.current && currentOrgId.current === orgId) return

            hasFetched.current = true
            currentOrgId.current = orgId

            try {
                setLoading(true)
                setError(null)

                const [orgResult, usersResponse, teamsResult, projectsResult] = await Promise.all([
                    getOrg(orgId),
                    getUsers(orgId),
                    getTeams(orgId),
                    getProject(orgId)
                ])

                setData({
                    org: orgResult,
                    users: usersResponse?.data || [],
                    unassignedUsers: usersResponse?.noTeam || [],
                    teams: teamsResult || [],
                    projects: {
                        total: Number(projectsResult?.total) || 0,
                        completedCount: Number(projectsResult?.completedCount) || 0,
                        incompleteCount: Number(projectsResult?.incompleteCount) || 0,
                        percentCompleted: Number(projectsResult?.percentCompleted) || 0,
                        teamsWorking: Number(projectsResult?.teamsWorking) || 0
                    }
                })
            } catch (err) {
                console.error('Error fetching org data:', err)
                setError(err instanceof Error ? err.message : 'Failed to fetch organization data')
                // Reset fetch flag on error so retry is possible
                hasFetched.current = false
            } finally {
                setLoading(false)
            }
        }

        fetchOrgData()
    }, [orgId])

    const refetch = () => {
        hasFetched.current = false
        currentOrgId.current = null
        setLoading(true)
        setError(null)
    }

    return { data, loading, error, refetch }
}