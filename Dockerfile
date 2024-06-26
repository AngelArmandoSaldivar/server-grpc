# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

ENV HOST 0.0.0.0

# Copia el package.json y el package-lock.json a /app
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación a /app
COPY . .

# Expone el puerto en el que la aplicación va a escuchar
EXPOSE 50051

# Ejecuta el servidor gRPC cuando se inicie el contenedor
CMD ["npm", "start"]