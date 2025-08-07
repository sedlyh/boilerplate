"use server"

import {Team} from "@/models/Teams"

export const getTeams = async (orgId: string) => {
    const teams = await Team.query("PK").eq(`ORG#${orgId}`).where("SK").beginsWith("TEAM#").exec()

    if (!teams) return [];

    // Serialize the teams array properly
    return JSON.parse(JSON.stringify(teams));
}