const appRoot = require("app-root-path");
const winston = require("winston");

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: `${appRoot}/logs/app.log` }),
  ],
});

module.exports = logger;
