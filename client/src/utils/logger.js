"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logToFile = void 0;
var fs_1 = require("fs");
// Function to log messages to a file
function logToFile(filename, message) {
    var logMessage = "".concat(message, "\n");
    fs_1.default.appendFile(filename, logMessage, function (err) {
        if (err) {
            console.error("Error writing to log file (".concat(filename, "):"), err);
        }
        else {
            console.log("Log written to ".concat(filename));
        }
    });
}
exports.logToFile = logToFile;
