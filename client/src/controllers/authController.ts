import { login, logAccountCreation } from "../services/authService";

// Example: Login controller
export async function loginController(req: any, res: any, db: any) {
    const { username, passwordHash } = req.body;

    const result = await login(username, passwordHash, db);

    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(401).json(result);
    }
}

// Example: Account creation controller
export async function accountCreationController(req: any, res: any) {
    const { username, role } = req.body;

    try {
        await logAccountCreation(username, role);
        res.status(201).json({ success: true, message: "Account created and logged successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error logging account creation." });
    }
}