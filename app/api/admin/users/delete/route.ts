// app/api/admin/users/delete/route.ts
import { User } from "@/models/User";
import {NextRequest, NextResponse} from "next/server";
import {requireRole} from "@/lib/auth/requireRole";
import {AdminDeleteUserCommand} from "@aws-sdk/client-cognito-identity-provider";
import {cognito} from "@/lib/auth/cognito";

export async function DELETE(request: NextRequest) {

    const {authorized} = requireRole(request, 'admin')

    if(!authorized){
        return NextResponse.json({ error: "User not authorized to make this request" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const cognitoID = userId?.replace(/^USER#/, "")

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }


    try {
        const command = new AdminDeleteUserCommand(
            {
                UserPoolId: process.env.COGNITO_USER_POOL_ID!,
                Username: cognitoID
            }
        )
        await cognito.send(command)

        await User.delete({
            PK: "ADMIN#DASH",
            SK: userId
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete user:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}


