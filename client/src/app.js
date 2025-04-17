"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("./controllers/authController");
var db_1 = require("./database/db");
var app = (0, express_1.default)();
app.use(express_1.default.json());
// Login route
app.post("/login", function (req, res) { return (0, authController_1.loginController)(req, res, db_1.db); });
// Account creation route
app.post("/create-account", function (req, res) { return (0, authController_1.accountCreationController)(req, res); });
// Start the server
var PORT = 3000;
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
