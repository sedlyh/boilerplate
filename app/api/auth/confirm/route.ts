import { NextRequest, NextResponse } from "next/server";
import { confirmSignup } from "@/services/auth/confirmSignup";


export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, code } = body;

    if (!email || !code) {
        return NextResponse.json({ error: "Missing email or confirmation code" }, { status: 400 });
    }

    try {

        await confirmSignup({ email, code });
        return NextResponse.json({ message: "Signup confirmed" }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
