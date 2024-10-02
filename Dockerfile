# Use a imagem oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o package.json e package-lock.json para o diretório de trabalho
COPY backend/package*.json ./

# Instale as dependências
RUN npm install

# Copie o código do projeto para o diretório de trabalho
COPY backend .

# Exponha a porta que o aplicativo irá rodar
EXPOSE 3333

# Comando para rodar o aplicativo
CMD ["npm", "start"]