import {
    ConfirmSignUpCommand,
    CodeMismatchException,
    ExpiredCodeException
} from "@aws-sdk/client-cognito-identity-provider";
import { cognito } from "@/lib/auth/cognito";

interface confirmSignupProps {
    email: string;
    code: string;
}

export async function confirmSignup({ email, code }: confirmSignupProps) {
    const command = new ConfirmSignUpCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: email,
        ConfirmationCode: code,
    });

    try {
        const response = await cognito.send(command);
        return response;
    } catch (err) {
        if (err instanceof CodeMismatchException) {
            throw new Error("Invalid confirmation code");
        } else if (err instanceof ExpiredCodeException) {
            throw new Error("Confirmation code expired");
        }
        throw err;
    }
}