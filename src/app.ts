import dotenv from "dotenv";
import Express, { Application, Request, Response } from "express";

import cors from "cors";
import path from "path";
import errorHandler from "./middlewares/errorHandler";

//Integrating Swagger
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import testRoute from "./routes/testRoute";

import { jwtAuth, schoolJwtAuth } from "./middlewares/authMiddleware";
import authRoutes from "./routes/authRoutes";
import schoolRoutes from "./routes/schoolRoutes";
import studentRoutes from "./routes/studentRoutes";
import userRoutes from "./routes/userRoutes";

//Configuration
dotenv.config({ path: "./config.env" });

//This is asynchronous import for passport configuration
import(`./config/passport`).then(() => {
  console.log("Passport Configured");
});

const app: Application = Express();

//Registering cors with * (All the domains)
app.use(
  cors({
    origin: "*",
  })
);

//Registering static routes
app.use(Express.static(path.join(__dirname, "../uploads")));

//Configuring yaml config files for access
app.use("/schema", Express.static(path.join(__dirname, "schema")));

//This is middle ware for registering payload type as Form data
app.use(Express.urlencoded({ extended: true }));

//This is middle ware for registering payload type as JSON
app.use(Express.json());

//Configuring Swagger UI
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, {
    swaggerUrl: "/schema/userSchema.yml",
  })
);

//Configuring routes
app.use("/api/auth", authRoutes);
app.use("/api/schools", jwtAuth, schoolRoutes);
//app.use("/api/schools", schoolRoutes);
app.use("/api/students", schoolJwtAuth, studentRoutes);
app.use("/api/test-ts-api", testRoute);
app.use("/api/users", userRoutes);

app.get("/docs.json", (req: Request, res: Response) => {
  res.send(swaggerSpec);
});

//This middleware for non matching routes
app.all("*", authRoutes);

//Registering Error handler
app.use(errorHandler);

// app.use((err, req, res, next) => {
//   return res.status(500).send({
//     status: "failed",
//     message: err.message,
//   });
// });

export default app;
