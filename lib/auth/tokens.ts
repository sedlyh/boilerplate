import { jwtVerify, createRemoteJWKSet } from "jose";

/**
 * Creates a JSON Web Key Set (JWKS) from a remote URL.
 * The URL is constructed using the AWS region and Cognito User Pool ID from environment variables.
 */
const jwks = createRemoteJWKSet(
    new URL(`https://cognito-idp.${process.env.MY_AWS_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}/.well-known/jwks.json`)
);

/**
 * Verifies an access token using the JSON Web Key Set (JWKS) and issuer information.
 *
 * @param {string} token - The JWT access token to verify.
 * @returns {Promise<object | null>} - The payload of the verified token if valid, or `null` if verification fails.
 */
export async function verifyAccessToken(token: string) {
    try {
        // Verify the token using the JWKS and issuer
        const { payload } = await jwtVerify(token, jwks, {
            issuer: `https://cognito-idp.${process.env.MY_AWS_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
        });

        return payload; // contains sub, email, etc.
    } catch (err) {
        // Log the error and return null if verification fails
        console.error("Token verification failed:", err);
        return null;
    }
}