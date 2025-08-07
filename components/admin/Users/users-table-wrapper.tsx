// components/admin/Users/users-table-wrapper.tsx
'use client'

import { useState, useEffect } from 'react'
import { DataTable } from "./user-data-table"
import { Users } from "./columns"

export function UsersTableWrapper({ initialData }: { initialData: Users[] }) {
    const [data, setData] = useState<Users[]>(initialData);

    return (
        <div className="min-w-fit m-8">
            <DataTable data={data} />
        </div>
    );
}