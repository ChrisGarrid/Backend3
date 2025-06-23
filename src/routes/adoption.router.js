const express = require("express");
const mongoose = require("mongoose");
const Pet = require("../models/pet.model");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Adopciones
 *   description: Endpoints relacionados con adopciones de mascotas
 */

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener mascotas disponibles para adopción
 *     tags: [Adopciones]
 *     responses:
 *       200:
 *         description: Lista de mascotas no adoptadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 */

/**
 * @route   GET /api/adoptions
 * @desc    Lista todas las mascotas que aún NO han sido adoptadas
 * @access  Público
 */
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find({ adopted: false }).populate("owner", "first_name last_name email");
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({
      error: "❌ Error al obtener mascotas",
      details: error.message
    });
  }
});

/**
 * @swagger
 * /api/adoptions/{petId}:
 *   post:
 *     summary: Marcar una mascota como adoptada
 *     tags: [Adopciones]
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota a adoptar
 *     responses:
 *       200:
 *         description: Confirmación de adopción exitosa
 *       400:
 *         description: Mascota ya adoptada o ID inválido
 *       404:
 *         description: Mascota no encontrada
 */

/**
 * @route   POST /api/adoptions/:petId
 * @desc    Marca una mascota como adoptada
 * @access  Público (en MVP, luego puede requerir login)
 */
router.post("/:petId", async (req, res) => {
  const { petId } = req.params;

  // 1. Validar formato del ID
  if (!mongoose.Types.ObjectId.isValid(petId)) {
    return res.status(400).json({
      error: "ID inválido",
      details: "El ID proporcionado no tiene el formato correcto de MongoDB ObjectId"
    });
  }

  try {
    // 2. Buscar mascota por ID
    const pet = await Pet.findById(petId).populate("owner", "first_name last_name email");

    // 3. Validar existencia
    if (!pet) {
      return res.status(404).json({
        error: "Mascota no encontrada",
        details: `No existe una mascota con el ID ${petId}`
      });
    }

    // 4. Validar si ya fue adoptada
    if (pet.adopted) {
      return res.status(400).json({
        error: "Mascota ya adoptada",
        details: `La mascota ${pet.name} ya fue adoptada previamente`
      });
    }

    // 5. Marcar como adoptada
    pet.adopted = true;
    await pet.save();

    res.status(200).json({
      message: `✅ Mascota ${pet.name} adoptada con éxito`,
      adopter: pet.owner
    });

  } catch (error) {
    res.status(500).json({
      error: "❌ Error al procesar la adopción",
      details: error.message
    });
  }
});

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *         - species
 *         - adopted
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único generado por MongoDB
 *         name:
 *           type: string
 *           description: Nombre de la mascota
 *         species:
 *           type: string
 *           description: Especie de la mascota (perro, gato, etc.)
 *         breed:
 *           type: string
 *           description: Raza (opcional)
 *         age:
 *           type: number
 *           description: Edad en años
 *         adopted:
 *           type: boolean
 *           description: Estado de adopción
 *         owner:
 *           type: object
 *           description: Datos básicos del dueño (si ya fue adoptada)
 *           properties:
 *             _id:
 *               type: string
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 *             email:
 *               type: string
 */

