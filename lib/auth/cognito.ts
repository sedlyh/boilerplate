import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

export const cognito = new CognitoIdentityProviderClient({
    region: process.env.MY_AWS_REGION,
});
