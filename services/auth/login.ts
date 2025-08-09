import {
    InitiateAuthCommand,
    GetUserCommand
} from "@aws-sdk/client-cognito-identity-provider";
import { cognito } from "@/lib/auth/cognito";

interface loginProps {
    email: string;
    password: string;
}

export async function login({ email, password }: loginProps) {
    const authCommand = new InitiateAuthCommand({
        ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
        },
    });

    try {
        const authResponse = await cognito.send(authCommand);

        if (!authResponse.AuthenticationResult) {
            throw new Error("Authentication failed");
        }

        const tokens = authResponse.AuthenticationResult;

        // Get user details using the access token
        const getUserCommand = new GetUserCommand({
            AccessToken: tokens.AccessToken,
        });

        const userResponse = await cognito.send(getUserCommand);

        // Extract username from user attributes
        const usernameAttribute = userResponse.UserAttributes?.find(
            attr => attr.Name === "preferred_username"
        );

        const groupsAttr = userResponse.UserAttributes?.find(
            attr => attr.Name === 'cognito:groups'
        )

        const roles = groupsAttr?.Value?.split(',') ?? []


        return {
            accessToken: tokens.AccessToken,
            idToken: tokens.IdToken,
            refreshToken: tokens.RefreshToken,
            expiresIn: tokens.ExpiresIn,
            userSub: userResponse.Username, // This is actually the user's sub/ID
            email: email,
            username: usernameAttribute?.Value || email,
            roles,
        };
    } catch (err: any) {
        console.error("Login error:", err);
        throw err;
    }
}