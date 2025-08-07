"use client"

import { ColumnDef } from "@tanstack/react-table"
import {ArrowUpDown,  } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useState} from "react";
import {Badge} from "@/components/ui/badge";
import {clsx} from "clsx";


export type Users = {
    SK: string
    username: string
    roles: string[]
    email: string
    createdAt: string
}
export async function deleteUser(userId: string) {
    try {
        const response = await fetch(`/api/admin/users/delete?userId=${encodeURIComponent(userId)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete user');
        }

        window.location.reload();
    } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user');
    }
}

// handle group add and removal in progress ------------------------- reference file ------------------- not used yet


export const createColumns = (setTableData: React.Dispatch<React.SetStateAction<Users[]>>): ColumnDef<Users>[] => [
    {
        id: "actions",
        cell: ({ row }) => {
            const [open, setOpen] = useState(false);
            const user = row.original

            const raw = row.getValue("SK") as string;
            const cleaned = raw.replace(/^USER#/, "");

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions Menu</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.SK)}
                        >
                            Copy User ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem  onSelect={(e) => {
                                    e.preventDefault(); // prevent menu from closing
                                    setOpen(true);      // open alert manually
                                }} className="text-left">
                                    Delete User
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => {deleteUser(user.SK); setOpen(false)}}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <DropdownMenuItem
                            disabled={user.roles.includes("admin")}

                        >
                            Promote User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            disabled={!user.roles.includes("admin")}
                        >
                            Demote User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "SK",
        header: () => <div className="text-left">ID</div>,
        cell: ({ row }) => {
            const raw = row.getValue("SK") as string;
            const cleaned = raw.replace(/^USER#/, "");
            return <div className="text-left font-medium">{cleaned}</div>;
        }
    },
    {
        accessorKey: "username",
        header: () => <div className="text-left">Username</div>,
        cell: ({ row }) => {
            const raw = row.getValue("username") as string;
            return <div className="text-left font-medium">{raw}</div>;
        }
    },
    {
        accessorKey: "roles",
        cell: ({ row }) => {
            const raw = row.getValue("roles") as Array<string>;
            return raw.map(( role, i) =>
                <Badge
                    className={clsx("mr-2 border-orange-300 text-orange-400", role === "admin" && "bg-transparent text-orange-500 border-orange-500")}
                    key={i}
                    variant={role == "admin"? "default" : "outline"}>
                    {role}
                </Badge>)},
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Roles
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
    }},
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const rawDate = row.getValue("createdAt") as string;
            const formatted = new Date(rawDate).toISOString().split("T")[0];
            return formatted;
        }
    }

]