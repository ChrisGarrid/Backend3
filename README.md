# 📦 Proyecto Final Backend - Curso Full Stack

Este repositorio contiene la API del proyecto final para el curso de desarrollo Full Stack. La API fue desarrollada con Node.js, Express y MongoDB, e incluye autenticación, rutas protegidas, generación de datos simulados, documentación Swagger y dockerización completa.

---

## 🛠 Tecnologías utilizadas

- Node.js + Express
- MongoDB Atlas + Mongoose
- Docker
- Swagger (OpenAPI)
- Postman (testing funcional)

---

## 📁 Instalación y ejecución

### 1. Clonar el repositorio


git clone https://github.com/tuusuario/micelio-backend.git
cd micelio-backend
2. Instalar dependencias

npm install
3. Configurar archivo .env
env
Copiar
Editar
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/Micelio

🚀 Ejecución del proyecto
Modo local

npm start
Modo Docker
Construir imagen:


docker build -t micelio-backend .
Ejecutar contenedor:


docker run -p 3000:3000 --env-file .env micelio-backend
Si usas WSL 2 en Windows y tu CPU es AMD64, puede requerir:


docker buildx build --platform linux/amd64 --tag micelio-backend .
docker run --platform linux/amd64 -p 3000:3000 --env-file .env micelio-backend

🧪 Pruebas funcionales (Postman)
Se probaron los siguientes endpoints:

Método	Ruta	Descripción
GET	/api/adoptions	Lista mascotas disponibles
POST	/api/adoptions/:petId	Marca una mascota como adoptada
GET	/api/mocks/mockingusers	Genera usuarios mock (sin persistencia)
POST	/api/mocks/generateData	Crea usuarios y mascotas en MongoDB
GET	/api/users	Consulta usuarios desde la base de datos

Todos fueron verificados mediante pruebas funcionales en Postman con éxito (códigos 200 y 201).

📘 Documentación de API (Swagger)
Disponible al ejecutar el servidor:


http://localhost:3000/api-docs
Incluye documentación para todos los endpoints principales.

🐳 Docker
Archivo Dockerfile incluido.

Para asegurar compatibilidad multiplataforma (especialmente en Windows con WSL 2), se utilizó:


docker buildx build --platform linux/amd64 -t micelio-backend .
✅ Checklist de entrega
Requisito	Estado
CRUD funcional	✅ Cumplido
Mock de datos funcional	✅ Cumplido
Documentación Swagger activa	✅ Cumplido
Tests funcionales en Postman	✅ Cumplido
Dockerfile y ejecución Docker	✅ Cumplido

📌 Notas finales
Proyecto entregado a través de repositorio GitHub.