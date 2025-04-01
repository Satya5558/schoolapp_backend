import swaggerJSDoc from "swagger-jsdoc";

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

const options: swaggerJSDoc.Options = {
  definition: swaggerDefinition,
  apis:
    process.env.NODE_ENV === "development"
      ? [`./src/routes/*.ts`]
      : [`./src/routes/*.ts`], // Path to the API routes in your Node.js application
};

export default swaggerJSDoc(options);
