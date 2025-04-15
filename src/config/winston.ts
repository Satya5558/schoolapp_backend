import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      const location =
        stack && typeof stack === "string"
          ? typeof (stack as string).split("\n")[1]
          : "unknown location"; // This gets the 2nd line in the stack trace

      return `${timestamp} [${level}] ${message} (Location: ${location.trim()})`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: process.env.LOG_FILE || "app.log",
    }),
  ],
});

export default logger;
