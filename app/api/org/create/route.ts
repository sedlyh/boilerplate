import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { requireAuth } from '@/lib/auth/requireAuth'
import { Org } from '@/models/Org'
import { User } from '@/models/User'
import { Membership } from '@/models/Membership'
import { Team } from '@/models/Teams'
import * as dynamoose from 'dynamoose'

export async function POST(req: NextRequest) {
    const { authorized, response, user } = requireAuth(req)

    if (!authorized) return response

    const now = new Date().toISOString()
    const { orgName } = await req.json()

    if (!orgName) {
        return NextResponse.json({ error: 'Missing org name' }, { status: 400 })
    }

    const orgId = `org_${uuidv4()}`
    const teamId = `team_${uuidv4()}`
    try {

        const existingOrgMembership = await User.query("PK")
            .beginsWith("ORG#")
            .and()
            .where("SK")
            .eq(`USER#${user?.id}`)
            .exec();

        if (existingOrgMembership.length > 0) {
            return NextResponse.json({
                error: 'Organization already exists',
                orgId: existingOrgMembership[0].PK.replace('ORG#', '')
            }, { status: 409 }) // 409 Conflict is appropriate here
        }


        await dynamoose.transaction([
            Org.transaction.create(
                {
                    PK: `ORG#${orgId}`,
                    SK: 'ORG',
                    type: 'Organization',
                    name: orgName,
                    createdAt: now,
                }
            ),
            User.transaction.create(
                {
                    PK: `ORG#${orgId}`,
                    SK: `USER#${user?.id}`,
                    type: 'User',
                    email: user?.email,
                    name: '',
                    joinedAt: now,
                }
            ),
            Membership.transaction.create(
                {
                    PK: `ORG#${orgId}`,
                    SK: `MEMBERSHIP#USER#${user?.id}`,
                    type: 'UserOrg',
                    role: 'OrgAdmin',
                    permissions: ['create_project', 'invite_user'],
                }
            ),
            Team.transaction.create(
                {
                    PK: `ORG#${orgId}`,
                    SK: `TEAM#${teamId}`,
                    type: 'Team',
                    name: 'Core Team',
                    createdAt: now,
                }
            ),
            Membership.transaction.create(
                {
                    PK: `USER#${user?.id}`,
                    SK: `MEMBERSHIP#TEAM#${teamId}`,
                    type: 'UserTeam',
                    role: 'Lead',
                }
            )
        ]);

        console.log('✅ Org created successfully')
        return NextResponse.json({ orgId, teamId }, { status: 201 })

    } catch (err) {
        console.error('❌ Error creating org:', err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}