const mongoose = require("mongoose");

/**
 * Esquema de usuario para la aplicación Micelio.
 * Representa a un usuario registrado en el sistema.
 */
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
    description: "Nombre de pila del usuario"
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
    description: "Apellido del usuario"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    description: "Correo electrónico único"
  },
  password: {
    type: String,
    required: true,
    description: "Contraseña encriptada del usuario"
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    description: "Rol del usuario en el sistema"
  },
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      description: "Referencias a mascotas asociadas"
    }
  ]
}, {
  timestamps: true // Añade createdAt y updatedAt automáticamente
});

const User = mongoose.model("User", userSchema);

module.exports = User;
