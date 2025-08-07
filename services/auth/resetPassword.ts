import { ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognito } from "@/lib/auth/cognito";

export async function resetPassword({
                                        email,
                                        code,
                                        newPassword,
                                    }: {
    email: string;
    code: string;
    newPassword: string;
}) {
    const command = new ConfirmForgotPasswordCommand({
        ClientId: process.env.COGNITO_CLIENT_ID!,
        Username: email,
        ConfirmationCode: code,
        Password: newPassword,
    });

    await cognito.send(command);
}
