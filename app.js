const express = require("express");
const cors = require("cors");

const schoolRoutes = require("./routes/schoolRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", schoolRoutes);

app.use((req, res, next) => {});

app.use((err, req, res, next) => {
  console.log(`Error occured ${e.message}`);
});

module.exports = app;
