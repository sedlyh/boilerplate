"use client"

import React from 'react'
import { CheckIcon, FileIcon, UserIcon, UsersIcon } from "lucide-react"
import { IconBuilding } from "@tabler/icons-react"
import { useParams } from 'next/navigation'
import { SiteHeader } from "@/components/site-header"
import { useOrgData } from '@/components/hooks/useOrgData'
import { OrgMetricCard } from '@/components/OrgMetricCard'
import { LoadingState } from '@/components/LoadingState'
import { ErrorState } from '@/components/ErrorState'

const OrganizationDashboard: React.FC = () => {
    const params = useParams()
    const orgId = params.orgId as string
    const { data, loading, error, refetch } = useOrgData(orgId)

    if (loading) return <LoadingState />
    if (error) return <ErrorState error={error} onRetry={refetch} />

    const { org, users, unassignedUsers, teams, projects } = data

    const metrics = [
        {
            title: "Total Users",
            value: users.length.toString(),
            icon: <UserIcon className="h-5 w-5" />,
            footerTitle: "Onboarding Status",
            footerDescription: unassignedUsers.length === 0
                ? "Perfect! All users are assigned to teams"
                : `${unassignedUsers.length} user${unassignedUsers.length !== 1 ? 's' : ''} need team assignment`
        },
        {
            title: "Active Projects",
            value: projects.total.toString(),
            icon: <FileIcon className="h-5 w-5" />,
            footerTitle: "Completion Rate",
            footerDescription: projects.total === 0
                ? "Ready to start your first project"
                : `${projects.percentCompleted}% completion rate`
        },
        {
            title: "Active Teams",
            value: teams.length.toString(),
            icon: <UsersIcon className="h-5 w-5" />,
            footerTitle: "Collaboration Health",
            footerDescription: teams.length > 0
                ? "Teams are actively collaborating"
                : "Create teams to improve collaboration"
        },
        {
            title: "Completed Projects",
            value: projects.completedCount.toString(),
            icon: <CheckIcon className="h-5 w-5" />,
            footerTitle: "Active Work",
            footerDescription: projects.total === 0
                ? "No active projects yet"
                : `${projects.incompleteCount} project${projects.incompleteCount !== 1 ? 's' : ''} in progress`
        }
    ]

    return (
        <>
            <SiteHeader header="Organization Dashboard" />
            <main className="max-w-6xl mx-auto p-6 space-y-8 text-gray-800 @container/main flex-1">
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-4xl md:ml-6 font-bold text-gray-900 dark:text-white">
                        {org?.name || 'Loading...'}
                    </h1>
                    <IconBuilding className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                </header>

                <section className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    {metrics.map((metric) => (
                        <OrgMetricCard key={metric.title} {...metric} />
                    ))}
                </section>

                <div className="flex justify-center">
                    <hr className="w-3/4 border-gray-200 dark:border-gray-700" />
                </div>
            </main>
        </>
    )
}

export default OrganizationDashboard