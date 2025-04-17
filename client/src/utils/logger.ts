import fs from "fs";

// Function to log messages to a file
export function logToFile(filename: string, message: string) {
    const logMessage = `${message}\n`;

    fs.appendFile(filename, logMessage, (err) => {
        if (err) {
            console.error(`Error writing to log file (${filename}):`, err);
        } else {
            console.log(`Log written to ${filename}`);
        }
    });
}