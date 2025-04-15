import mongoose from "mongoose";

import logger from "./config/winston";

import app from "./app";

// Handle uncaught exceptions
process.on("uncaughtException", (err: unknown) => {
  if (err instanceof Error) {
    //Logging error
    logger.error(err.stack);
  }

  console.error("Uncaught Exception:", err);
  process.exit(1);
});

mongoose
  .connect(process.env.DB, {})
  .then(() => {
    //Logging DB connection success
    console.log("DB connection successful");
    logger.info("DB connection successful");
  })
  .catch((err) => {
    //Logging DB connection error
    console.error("DB connection error:", err);
    logger.error("DB connection error:", err);
    process.exit(1);
  });

//Server starting
var server = app.listen(process.env.PORT, () => {
  console.log(`server running on the port ${process.env.PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: unknown, promise) => {
  //Logging unhandled exceptions
  if (err instanceof Error) {
    logger.error(err.stack);
  }

  //console.error("Unhandled Rejection:", err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle termination signals
process.on("SIGINT", () => {
  logger.info("SIGINT received. Closing server...");
  //console.log("SIGINT received. Closing server...");
  server.close(() => {
    process.exit(0);
  });
});

//Received process close request from another process
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Closing server...");
  //console.log("SIGTERM received. Closing server...");
  server.close(() => {
    process.exit(0);
  });
});
