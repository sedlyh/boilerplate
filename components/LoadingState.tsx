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