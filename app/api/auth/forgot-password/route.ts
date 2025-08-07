import { forgotPassword } from "@/services/auth/forgotPassword";

export async function POST(req: Request) {
    const { email } = await req.json();

    if (!email) return new Response("Email is required", { status: 400 });

    try {
        await forgotPassword(email);
        return Response.json({ message: "Reset code sent" });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400 });
    }
}
