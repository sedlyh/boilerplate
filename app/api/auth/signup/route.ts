import { NextRequest, NextResponse } from "next/server";
import { signup } from "@/services/auth/signup";

export async function POST(req: NextRequest) {
    try {
        const { email, password, username } = await req.json();

        if (!email || !password || !username) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const result = await signup({ email, password, username });
        return NextResponse.json({
            message: "Signup successful. You can now log in.",
            userSub: result.userSub
        });

    } catch (error: any) {
        console.error("Signup error:", error);

        if (error.message.includes("already exists")) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: error.message || "Signup failed" },
            { status: 500 }
        );
    }
}