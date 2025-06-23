const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },                          // Nombre de la mascota
  species: { type: String, required: true },                       // Especie (e.g. perro, gato)
  breed: { type: String },                                         // Raza (opcional)
  age: { type: Number, min: 0 },                                   // Edad en años
  adopted: { type: Boolean, default: false },                      // Estado de adopción
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }     // Relación con usuario
}, {
  timestamps: true                                                 // createdAt / updatedAt
});

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
// Este modelo define la estructura de los documentos de mascotas en la base de datos.
// Incluye campos para nombre, especie, raza, edad, estado de adopción y una referencia al propietario (usuario).
// Utiliza timestamps para registrar automáticamente las fechas de creación y actualización de cada documento.  
// Asegúrate de que el modelo esté correctamente importado y utilizado en tu aplicación para interactuar con la colección de mascotas en MongoDB.
// Puedes crear, leer, actualizar y eliminar documentos de mascotas utilizando este modelo con Mongoose.