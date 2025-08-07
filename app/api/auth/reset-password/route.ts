import { resetPassword } from "@/services/auth/resetPassword";

export async function POST(req: Request) {
    const { email, code, newPassword } = await req.json();

    if (!email || !code || !newPassword)
        return new Response("Missing fields", { status: 400 });

    try {
        await resetPassword({ email, code, newPassword });
        return Response.json({ message: "Password reset successful" });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400 });
    }
}
