const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  swaggerDefinition: {
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation challenge MELI Node.js API",
    },
    basePath: "/",
  },
  apis: [path.join(__dirname, "./server/routes/*.routes.js")], // Solo archivos en el directorio routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
