import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth/getServerUser"; // whatever you use to read the user on the server
import { ensureOrgForUser } from "@/lib/org/ensure";

export default async function WelcomePage() {
    const user = await getServerUser(); // must be server-side; no cookies needed here
    if (!user) throw new Error("Not authenticated");

    const { id, email } = user;
    const { orgId } = await ensureOrgForUser(id, email, "Acme Inc.");

    redirect(`/push/org/${orgId}`);
}
