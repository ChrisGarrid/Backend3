# Usa imagen base liviana y probada para compatibilidad
FROM --platform=linux/amd64 node:20-alpine

# Establece directorio de trabajo
WORKDIR /app

# Copia solo archivos de dependencias para instalar primero
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "src/server.js"]
