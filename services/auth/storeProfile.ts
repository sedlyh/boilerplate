import { User } from "@/models/User";

interface storeProfileProps {
    id: string;
    email: string;
    username: string;
    roles: string[]
}

export async function storeProfile({ id, email, username, roles }: storeProfileProps) {
    const pk = `USER#${id}`;
    const sk = `PROFILE`;

    try {
        // Check if user already exists - use the composite key correctly
        const existingUser = await User.get({ PK: pk, SK: sk });

        if (!existingUser) {
            // Create new user profile
            await User.create({
                PK: pk,
                SK: sk,
                email,
                username,
                createdAt: new Date().toISOString(),
                roles: roles || []
            });

            // Check if admin index exists
            const adminIndex = await User.get({
                PK: "ADMIN#DASH",
                SK: `USER#${id}`,
            });

            if (!adminIndex) {
                await User.create({
                    PK: "ADMIN#DASH",
                    SK: `USER#${id}`,
                    username,
                    email,
                    userRef: pk,
                    createdAt: new Date().toISOString(),
                });
            }

            console.log("Created new user profile:", id);
        }

        return true;
    } catch (error) {
        console.error("Error storing profile:", error);
        throw error;
    }
}