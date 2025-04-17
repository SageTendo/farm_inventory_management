import express from "express";
import { loginController, accountCreationController } from "./controllers/authController";
import { db } from "./database/db";

const app = express();
app.use(express.json());

// Login route
app.post("/login", (req, res) => loginController(req, res, db));

// Account creation route
app.post("/create-account", (req, res) => accountCreationController(req, res));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});