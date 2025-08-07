
// PATCH /api/users/[username]/groups
import {NextRequest, NextResponse} from "next/server";
import {User} from "@/models/User";
import {cognito} from "@/lib/auth/cognito";
import {AdminAddUserToGroupCommand, AdminRemoveUserFromGroupCommand} from "@aws-sdk/client-cognito-identity-provider";
import {requireRole} from "@/lib/auth/requireRole";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { username: string } }
): Promise<NextResponse> {
    try {

        const {authorized} = requireRole(req, "admin")

        if(!authorized){
            return NextResponse.json(
                { error: "User is not authorized to make this request" },
                { status: 401 }
            );
        }

        const username = params.username;
        const body = await req.json();
        const { action, groupName } = body;
        const cognitoUsername = username.replace(/^USER#/, "");

        console.log(cognitoUsername)


        if (!username || !action || !groupName) {
            return NextResponse.json(
                { error: "Missing username, action, or groupName" },
                { status: 400 }
            );
        }
        if (action == "add"){
        }

        // Update Cognito first
        if (action === "add") {
            await cognito.send(new AdminAddUserToGroupCommand({
                GroupName: groupName,
                Username: cognitoUsername, // Use cleaned username
                UserPoolId: process.env.COGNITO_USER_POOL_ID!,
            }));
        } else if (action === "remove") {
            await cognito.send(new AdminRemoveUserFromGroupCommand({
                GroupName: groupName,
                Username: cognitoUsername, // Use cleaned username
                UserPoolId: process.env.COGNITO_USER_POOL_ID!,
            }));
        }
        const PK = "ADMIN#DASH";
        const SK = `USER#${decodeURIComponent(username)}`;

        const user =  await User.get({ PK: "ADMIN#DASH", SK: username });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (action === "add") {
            if (!user.roles.includes(groupName)) {
                user.roles.push(groupName);
                await user.save();
            }
        } else if (action === "remove") {
            user.roles = user.roles.filter((g: string) => g !== groupName);
            await user.save();
        } else {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        return NextResponse.json({ message: "Group update successful", user });
    } catch (err: any) {
        console.error("Group update error:", err);
        return NextResponse.json(
            { error: err.message || "Failed to update groups" },
            { status: 500 }
        );
    }
}
