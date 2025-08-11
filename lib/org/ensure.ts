'use server'

import 'server-only';
import { v4 as uuidv4 } from "uuid";
import dynamoose from "@/lib/dynamoose-config"
import { Org } from "@/models/Org";
import { User } from "@/models/User";
import { Membership } from "@/models/Membership";
import { Team } from "@/models/Teams";

export async function ensureOrgForUser(userId: string, email: string, orgName?: string) {
    const now = new Date().toISOString();

    // Check if ANY user->org mapping exists (regardless of orgId field)
    const existing = await Membership.get(
        { PK: `USER#${userId}`, SK: "USERORG" },
        { consistent: true }
    ).catch(() => null);

    // If ANY record exists, don't create a new org
    if (existing) {
        // The record exists but maybe orgId isn't in your Membership schema
        // Try to get the orgId from the record, or query for it differently
        const orgIdFromRecord = existing.orgId || existing.orgId;

        if (orgIdFromRecord) {
            return { orgId: orgIdFromRecord as string, created: false };
        }

        // If we can't get orgId, there's a data integrity issue
        // Log it and potentially fix it, but DON'T create duplicate orgs
        console.error('User->Org mapping exists but orgId is missing:', existing);
        throw new Error(`Data integrity issue: User ${userId} has org mapping but no orgId`);
    }

    // Only create if NO record exists
    const orgId = `org_${uuidv4()}`;
    const teamId = `team_${uuidv4()}`;

    await dynamoose.transaction([
        Membership.transaction.create(
            {
                PK: `USER#${userId}`,
                SK: "USERORG",
                type: "UserOrgMapping",
                userId,
                orgId,
                createdAt: now
            },
            { condition: new dynamoose.Condition().attribute('PK').not().exists()
            }

        ),
        Org.transaction.create(
            {
                PK: `ORG#${orgId}`,
                SK: "ORG",
                type: "Organization",
                orgId,
                ownerId: userId,
                name: orgName ?? "My Organization",
                createdAt: now
            }
        ),
        Membership.transaction.create(
            {
                PK: `ORG#${orgId}`,
                SK: `MEMBERSHIP#USER#${userId}`,
                type: "UserOrg",
                userId,
                role: "OrgAdmin",
                permissions: ["create_project", "invite_user"],
                joinedAt: now
            }
        ),
        Team.transaction.create(
            {
                PK: `ORG#${orgId}`,
                SK: `TEAM#${teamId}`,
                type: "Team",
                teamId,
                name: "Core Team",
                createdAt: now
            }
        ),
        Membership.transaction.create(
            {
                PK: `USER#${userId}`,
                SK: `MEMBERSHIP#TEAM#${teamId}`,
                type: "UserTeam",
                userId,
                teamId,
                role: "Lead",
                joinedAt: now
            }
        ),
        User.transaction.create(
            {
                PK: `ORG#${orgId}`,
                SK: `USER#${userId}`,
                type: "User",
                userId,
                email,
                name: "",
                joinedAt: now
            }
        ),
    ]);

    return { orgId, created: true };
}