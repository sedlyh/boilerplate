import React from 'react'
import { LucideIcon } from 'lucide-react'

interface OrgMetricCardProps {
    title: string
    value: string
    icon: React.ReactElement<LucideIcon>
    footerTitle: string
    footerDescription: string
}

export const OrgMetricCard: React.FC<OrgMetricCardProps> = ({
                                                                title,
                                                                value,
                                                                icon,
                                                                footerTitle,
                                                                footerDescription
                                                            }) => (
    <div className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
            <div className="text-gray-400">{icon}</div>
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
        <div className="pt-3">
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{footerTitle}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">{footerDescription}</p>
        </div>
    </div>
)

// components/LoadingState.tsx
export const LoadingState: React.FC = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="animate-pulse">
            <div className="flex justify-between items-center mb-8">
                <div className="h-10 bg-gray-200 rounded w-48"></div>
                <div className="h-7 w-7 bg-gray-200 rounded"></div>
            </div>
            <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                ))}
            </div>
        </div>
    </div>
)