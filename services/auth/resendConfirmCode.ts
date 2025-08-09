import { ResendConfirmationCodeCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognito } from "@/lib/auth/cognito";

export async function resendConfirmationCode(email: string) {
    const command = new ResendConfirmationCodeCommand({
        ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
        Username: email,
    });

    try {
        await cognito.send(command);
    } catch (err: any) {
        if (err.name === "UserNotFoundException") {
            throw new Error("User does not exist");
        } else if (err.name === "InvalidParameterException") {
            throw new Error("User is already confirmed");
        }
        throw err;
    }
}
