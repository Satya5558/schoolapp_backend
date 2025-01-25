const appRoot = require("app-root-path");
const express = require("express");
const cors = require("cors");
const path = require("path");

//Middleware
const errorHandler = require("./middlewares/errorHandler");

//Integrating Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/authRoutes");
const schoolRoutes = require("./routes/schoolRoutes");
const userRoutes = require("./routes/userRoutes");
const { jwtAuth } = require("./middlewares/authMiddleware");

require(`${appRoot}/config/passport`);

const app = express();

//Registering cors with * (All the domains)
app.use(
  cors({
    origin: "*",
  })
);

//Registring static routes
app.use(express.static(path.join(__dirname, "/uploads")));

//Configuring yaml config files for access
app.use("/schema", express.static(path.join(__dirname, "schema")));

//This is middle ware for registering payload type as Form data
app.use(express.urlencoded({ extended: true }));

//This is middle ware for registering payload type as JSON
app.use(express.json());

//Configuring Swagger UI
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, {
    swaggerUrl: "/schema123/userSchema.yml",
  })
);

//Configuring routes
app.use("/api/auth", authRoutes);
app.use("/api/schools", jwtAuth, schoolRoutes);
app.use("/api/users", userRoutes);

//This middleware for non matching routes
app.all("*", (req, res, next) => {
  return res.status(404).send({
    status: "failed",
    message: "Status not found",
  });
});

//Registring Error handler
app.use(errorHandler);

// app.use((err, req, res, next) => {
//   return res.status(500).send({
//     status: "failed",
//     message: err.message,
//   });
// });

module.exports = app;
