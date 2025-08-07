import { resendConfirmationCode } from "@/services/auth/resendConfirmCode";

export async function POST(req: Request) {
    const { email } = await req.json();

    if (!email) {
        return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    try {
        await resendConfirmationCode(email);
        return Response.json({ message: "Confirmation code resent" });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400 });
    }
}
