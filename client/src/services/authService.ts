import { userTable } from "../database/schema/index"; 
import { roleTypes } from "../database/schema/constants";
import { sql } from "drizzle-orm"; 
import { logToFile } from "../utils/logger"

// Function to validate login
export async function login(username: string, passwordHash: string, db: any) {
    try {
        // Query the datebase for the user
        const user = await db
            .select()
            .from(userTable)
            .where(
                sql`${userTable.username} = ${username}`,
                sql`${userTable.passwordHash} = ${passwordHash}`
            )
            .get();
        
        // Check if user exists
        if(!user) {
            throw new Error("Invalid username or password.")
        }

        // Check if the user has a valid role
        if (!["admin", "owner", "staff"].includes(roleTypes[user.roleID])) {
            throw new Error("Unauthorized role."); 
        }

        return { success : true, message: "Login successful", user }; 
    } catch (error) {
        return { success: false, message: "Error" }; 
    }
}

export async function logAccountCreation(username: string, role: string) {
    const logMessage = `Account created: ${username}, Role: ${role}, Timestamp: ${new Date().toISOString()}\n`;
    logToFile("account_creation_log.txt", logMessage);
}