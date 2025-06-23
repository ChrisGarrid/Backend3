const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para gestión y consulta de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener lista de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios existentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find().limit(100); // limitamos por rendimiento
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
});

module.exports = router;
