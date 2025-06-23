const express = require("express");
const app = express();

// 👉 Importación de rutas
const adoptionRouter = require("./routes/adoption.router");
const mocksRouter = require("./routes/mocks.router");

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

// 📝 Configuración de Swagger para documentación de la API
    // Ruta para Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🧠 Middleware para interpretar JSON antes de manejar rutas
app.use(express.json());

// 🚏 Montaje de routers
app.use("/api/adoptions", adoptionRouter);
app.use("/api/mocks", mocksRouter);

// ✅ Exportación de la app
module.exports = app;

// Este archivo configura una aplicación de Express con el middleware para analizar JSON.
// También importa y utiliza el router para manejar la generación de datos mock en el endpoint `/api/mocks`.
// La aplicación se exporta para ser utilizada en otras partes del proyecto, como en el archivo del servidor principal.