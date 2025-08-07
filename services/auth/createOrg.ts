export const createOrganization = async (orgName: string = 'My First Org') => {
    try {
        const response = await fetch('/api/org/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orgName }),
        })

        if (!response.ok && !(response.status === 409)) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        const { orgId, error } = data

        if (orgId) {
            return { success: true, orgId: String(orgId) }
        } else {
            return { success: false, error: error || 'Failed to create organization' }
        }
    } catch (err) {
        console.error('Organization creation error:', err)
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Network error occurred'
        }
    }
}

// // Helper function to safely fetch and parse API responses
// export const safeFetch = async (url: string, options?: RequestInit) => {
//     try {
//         const response = await fetch(url, options)
//
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`)
//         }
//
//         const data = await response.json()
//
//         // Ensure data is properly serializable
//         return JSON.parse(JSON.stringify(data))
//     } catch (error) {
//         console.error(`Fetch error for ${url}:`, error)
//         throw error
//     }
// }