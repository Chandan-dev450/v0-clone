"use server"

import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

export const onBoardUser = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return {
                success: false,
                error: "No authenticated user found"
            }
        }

        const { id, firstName, lastName, imageUrl, emailAddresses } = user;

        const userData = {
            name: `${firstName || ""} ${lastName || ""}`.trim() || null,
            image: imageUrl || null,
            email: emailAddresses[0]?.emailAddress || "",
        };

        try {
            const newUser = await db.user.upsert({
                where: { clerkId: id },
                update: userData, // Uses the shared object
                create: {
                    clerkId: id,    // clerkId is required for creation
                    ...userData,    // Spreads the rest of the data
                },
            });

            return {
                success: true,
                user: newUser,
                message: "User onboarded successfully",
            };

            console.log("User onboarded successfully:", newUser);
        } catch (error) {
            return {
                success: false,
                message: "Failed to sync user data",
                error: error.message,
            };
        }
    } catch (error) {
        console.error("Error onboarding user", error)
        return {
            success: false,
            error: "Failed to onboard user"
        }
    }
}

export const getCurrentUser = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return null;
        }

        const dbUser = await db.user.findUnique({
            where: {
                clerkId: user.id
            },
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                clerkId: true
            }
        })

        return dbUser;
    } catch (error) {
        console.error("Error fetching current user:", error)
        return null;
    }
}