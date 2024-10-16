# Use a imagem oficial do Node.js como base
FROM node:latest

# Defina o diretório de trabalho no container
WORKDIR /app

# Instale o cliente MySQL
RUN apt-get update && apt-get install -y default-mysql-client

# Copie o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código do projeto para o diretório de trabalho
COPY . .

# Torne o script de espera executável
RUN chmod +x /app/wait-for-mysql-connection.sh

# Exponha a porta que o aplicativo irá rodar
EXPOSE 3333

# Comando para rodar o aplicativo
CMD ["sh", "/app/wait-for-mysql-connection.sh", "db", "npm", "start"]
