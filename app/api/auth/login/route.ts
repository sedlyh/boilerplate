import { NextRequest, NextResponse } from "next/server";
import { login } from "@/services/auth/login";
import { storeProfile } from "@/services/auth/storeProfile";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
        }

        // Authenticate the user and retrieve tokens
        const tokens = await login({ email, password });

        console.log(tokens)

        if (!tokens.accessToken || !tokens.idToken) {
            throw new Error("Missing required tokens");
        }

        // Store/update profile in DynamoDB on login
        // The login service should return user details including username
        // if (tokens.userSub && tokens.email) {
        //     await storeProfile({
        //         id: tokens.userSub,
        //         email: tokens.email,
        //         username: tokens.username || tokens.email, // fallback to email if username not available
        //         roles: tokens.roles || [],
        //     });
        // }

        const response = NextResponse.json({ message: "Login successful" });

        // Set secure cookies for the tokens
        response.cookies.set("accessToken", tokens.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: tokens.expiresIn || 3600,
            path: "/",
        });

        response.cookies.set("idToken", tokens.idToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: tokens.expiresIn || 3600,
            path: "/",
        });

        if (tokens.refreshToken) {
            response.cookies.set("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: "/",
            });
        }

        return response;
    } catch (err: any) {
        console.error("Login error:", err);

        if (err.name === "NotAuthorizedException") {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { error: err.message || "Login failed" },
            { status: 401 }
        );
    }
}