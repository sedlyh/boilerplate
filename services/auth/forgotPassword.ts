import { ForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognito } from "@/lib/auth/cognito";

export async function forgotPassword(email: string) {
    const command = new ForgotPasswordCommand({
        ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
        Username: email,
    });

    try {
        await cognito.send(command);
    } catch (err: any) {
        if (err.name === "UserNotFoundException") {
            throw new Error("No account with that email");
        } else if (err.name === "InvalidParameterException") {
            throw new Error("User is not confirmed");
        }
        throw err;
    }
}
