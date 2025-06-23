const bcrypt = require("bcrypt");

function generateMockUser(i) {
  return {
    first_name: `Nombre${i}`,
    last_name: `Apellido${i}`,
    email: `usuario${i}@micelio.com`,
    password: bcrypt.hashSync("coder123", 10),
    role: i % 2 === 0 ? "user" : "admin",
    pets: []
  };
}

function generateMockPet(i) {
  return {
    name: `Mascota${i}`,
    species: i % 2 === 0 ? "perro" : "gato"
  };
}

module.exports = { generateMockUser, generateMockPet };
// Este archivo contiene funciones para generar datos de prueba (mock) para usuarios y mascotas.
// `generateMockUser` crea un usuario con nombre, apellido, email, contraseña hasheada y rol.
// `generateMockPet` crea una mascota con nombre y especie.