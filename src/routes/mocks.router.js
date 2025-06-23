const express = require("express");
const router = express.Router();

const { generateMockUser, generateMockPet } = require("../utils/mockGenerator");
const User = require("../models/user.model");
const Pet = require("../models/pet.model");

/**
 * @swagger
 * tags:
 *   name: Mocks
 *   description: Endpoints para generar y consultar datos simulados
 */

/**
 * @swagger
 * /api/mocks/mockingusers:
 *   get:
 *     summary: Genera 50 usuarios simulados (mock)
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de usuarios simulados (no persistidos)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/mockingusers", (req, res) => {
  const users = [];
  for (let i = 0; i < 50; i++) {
    users.push(generateMockUser(i));
  }
  res.json(users);
});

/**
 * @swagger
 * /api/mocks/dbusers:
 *   get:
 *     summary: Consulta los usuarios almacenados en MongoDB
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de usuarios almacenados en base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/dbusers", async (req, res) => {
  try {
    const users = await User.find().populate("pets");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "❌ Error al consultar la base de datos", details: error.message });
  }
});

/**
 * @swagger
 * /api/mocks/generateData:
 *   post:
 *     summary: Genera usuarios y mascotas y los almacena en MongoDB
 *     tags: [Mocks]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: integer
 *                 default: 10
 *               pets:
 *                 type: integer
 *                 default: 5
 *     responses:
 *       201:
 *         description: Usuarios y mascotas generados correctamente
 *       500:
 *         description: Error al generar datos
 */
router.post("/generateData", async (req, res) => {
  const { users = 0, pets = 0 } = req.body;
  try {
    const newUsers = [];
    for (let i = 0; i < users; i++) {
      const user = new User(generateMockUser(i));
      await user.save();
      newUsers.push(user);
    }

    for (let i = 0; i < pets; i++) {
      const petData = generateMockPet(i);
      const randomUser = newUsers[Math.floor(Math.random() * newUsers.length)];
      const pet = new Pet({ ...petData, owner: randomUser._id });
      await pet.save();

      randomUser.pets.push(pet._id);
      await randomUser.save();
    }

    res.status(201).json({ message: `✅ Insertados ${users} usuarios y ${pets} mascotas` });
  } catch (error) {
    res.status(500).json({ error: "❌ Error al generar datos", details: error.message });
  }
});

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         pets:
 *           type: array
 *           items:
 *             type: string
 */
