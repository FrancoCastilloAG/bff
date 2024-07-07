# Usa una imagen base oficial de Node.js 16
FROM node:16

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el código fuente de la aplicación al directorio de trabajo
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto que usa la aplicación
EXPOSE 3001

# Define el comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
