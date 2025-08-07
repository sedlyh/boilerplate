"use server"

import { User } from "@/models/User";
import {Membership} from "@/models/Membership";

export const getUsers = async (orgId: string) => {
    const users = await User.query("PK").eq(`ORG#${orgId}`).where("SK").beginsWith("USER#").exec();

    const userIds = users.map(item => item.SK.split('#')[1]);

    const memberships = await Promise.all(
        userIds.map(userId =>
            Membership.query('PK')
                .eq(`USER#${userId}`)
                .where('SK')
                .beginsWith('MEMBERSHIP#TEAM#')
                .exec()
        )
    );

    const noTeam = userIds.filter((userId, index) => memberships[index].length === 0);

    if (!users) return null;

    // Properly serialize everything including the noTeam array
    return {
        data: JSON.parse(JSON.stringify(users)),
        noTeam: JSON.parse(JSON.stringify(noTeam))
    };
}