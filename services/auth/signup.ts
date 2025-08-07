import {
    SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { cognito } from "@/lib/auth/cognito";

interface signupProps {
    email: string;
    password: string;
    username: string;
}

export async function signup({ email, password, username }: signupProps) {
    const clientId = process.env.COGNITO_CLIENT_ID;

    if (!clientId) {
        throw new Error("COGNITO_CLIENT_ID is not set in environment variables.");
    }

    console.log("DEBUG: COGNITO_CLIENT_ID:", process.env.COGNITO_CLIENT_ID);

    const signUpCommand = new SignUpCommand({
        ClientId: clientId,
        Username: email,
        Password: password,
        UserAttributes: [
            {
                Name: "email",
                Value: email,
            },
            {
                Name: "preferred_username",
                Value: username,
            },
        ],
    });

    try {
        const response = await cognito.send(signUpCommand);

        return {
            userSub: response.UserSub,
            email: email,
            username: username
        };
    } catch (err: any) {
        console.error("Signup error:", err);

        if (err.name === "UsernameExistsException") {
            throw new Error("User with this email already exists");
        }

        throw err;
    }
}