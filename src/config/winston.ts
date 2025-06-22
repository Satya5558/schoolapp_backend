import path from "path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

console.log(process.env.LOG_FILE);
const transport = new DailyRotateFile({
  filename: process.env.LOG_FILE
    ? path.join(process.env.LOG_FILE, "application1-%DATE%.log")
    : path.resolve("../logs/application-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  zippedArchive: false,
  maxSize: "20m",
  maxFiles: "14d",
});

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
    transport,
    new winston.transports.Console(),
    // new winston.transports.File({
    //   filename: process.env.LOG_FILE || "app.log",
    // }),
  ],
});

transport.on("error", (error) => {
  console.log(error);
  // log or handle errors here
});

export default logger;
