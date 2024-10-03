# Use a imagem oficial do Node.js como base
FROM node:latest

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código do projeto para o diretório de trabalho
COPY . .

# Copie o script wait-for-it.sh para o container
COPY wait-for-mysql-connection.sh /usr/src/app/wait-for-mysql-connection.sh

# Torne o script executável
RUN chmod +x /usr/src/app/wait-for-mysql-connection.sh

# Exponha a porta que o aplicativo irá rodar
EXPOSE 3333

# Comando para rodar o aplicativo
CMD ["./wait-for-mysql-connection.sh", "db:3306", "--", "node", "app.js"]
