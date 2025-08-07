import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
    const response = NextResponse.json({ message: "Logged out" });

    // Clear all auth cookies
    response.cookies.set("accessToken", "", {
        path: "/",
        maxAge: 0,
    });

    response.cookies.set("idToken", "", {
        path: "/",
        maxAge: 0,
    });

    response.cookies.set("refreshToken", "", {
        path: "/",
        maxAge: 0,
    });

    return response;
}
