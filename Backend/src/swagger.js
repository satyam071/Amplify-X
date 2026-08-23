const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Amplify X API",
      version: "1.0.0",
      description: "API documentation for the Amplify X backend",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
  },

  apis: [path.join(__dirname, "routes", "*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
