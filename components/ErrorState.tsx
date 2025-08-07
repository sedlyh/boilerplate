interface ErrorStateProps {
    error: string
    onRetry: () => void
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
    <div className="max-w-6xl mx-auto p-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Organization</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
                onClick={onRetry}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
                Try Again
            </button>
        </div>
    </div>
)
