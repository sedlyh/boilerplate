import React from 'react'
import {SiteHeader} from "@/components/site-header";
import { IconUsers} from "@tabler/icons-react";
import OrgCards from "@/components/OrgCards";

const Page = () => {
    return (
        // all teams inside the org
        <>
            <SiteHeader header={"Teams"}/>
            <div className="max-w-6xl mx-auto p-6 space-y-8 text-gray-800 @container/main flex flex-1 flex-col gap-2 ">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-4xl md:ml-6 font-bold ">All Teams</h1>
                    <IconUsers className="size-7 "/>
                </div>
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">


                </div>


                {/*<div>*/}
                {/*    <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>*/}
                {/*    <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">*/}
                {/*        <li>Bob closed issue "Login Error"</li>*/}
                {/*        <li>Alice created "Frontend Revamp"</li>*/}
                {/*    </ul>*/}
                {/*</div>*/}

                {/*<hr/>*/}

                {/*<div>*/}
                {/*    <h2 className="text-lg font-semibold mb-4">Your Teams</h2>*/}
                {/*    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">*/}
                {/*        <div className="p-4 bg-white border rounded shadow-sm">*/}
                {/*            <h3 className="font-semibold">Team A</h3>*/}
                {/*            <p className="text-sm text-gray-500">Short description...</p>*/}
                {/*        </div>*/}
                {/*        <div className="p-4 bg-white border rounded shadow-sm">*/}
                {/*            <h3 className="font-semibold">Team B</h3>*/}
                {/*            <p className="text-sm text-gray-500">Short description...</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<hr/>*/}

                {/*<div>*/}
                {/*    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>*/}
                {/*    <div className="flex flex-wrap gap-4">*/}
                {/*        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">+ Create*/}
                {/*            Team*/}
                {/*        </button>*/}
                {/*        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">+ Invite*/}
                {/*            User*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </>
    )
}
export default Page
