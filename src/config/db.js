const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB Atlas con éxito");
    console.log("🌐 Base de datos activa:", mongoose.connection.name); // Línea agregada
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
// Este archivo configura la conexión a la base de datos MongoDB usando Mongoose.
// Se utiliza la variable de entorno MONGO_URI para la cadena de  conexión.
// Si la conexión es exitosa, se imprime un mensaje de éxito y el nombre de la base de datos activa.
// Si hay un error, se imprime un mensaje de error y se termina el proceso con un código de salida 1.
// Asegúrate de tener un archivo .env con la variable MONGO_URI configurada