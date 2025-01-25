const swaggerJsDoc = require("swagger-jsdoc");
const appRoot = require("app-root-path");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "School API",
    version: "1.0.0",
    description: "My API Description",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [`${appRoot}/routes/*.js`], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
