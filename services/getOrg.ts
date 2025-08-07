"use server"

import {Org} from "@/models/Org";

export const getOrg = async (orgId: string) => {
    const PK = `ORG#${orgId}`;
    const SK = "ORG";

    const org = await Org.get({PK, SK})

    if (!org) return null;
    return JSON.parse(JSON.stringify(org));
}