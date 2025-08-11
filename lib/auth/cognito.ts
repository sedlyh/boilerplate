import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

export const cognito = new CognitoIdentityProviderClient({
    region: process.env.NEXT_PUBLIC_MY_AWS_REGION,
});
