const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Micelio API',
      version: '1.0.0',
      description: 'Documentación de la API del proyecto Micelio',
    },
  },
  apis: ['./src/routes/*.js'], // 🧠 Aquí se buscarán los comentarios para la documentación
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;