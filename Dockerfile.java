# Use uma imagem base do OpenJDK baseada em Debian
FROM openjdk:21-jdk-slim

# Defina o diretório de trabalho no container
WORKDIR /app

# Instale o cliente MySQL para permitir o uso de comandos MySQL no script de espera
RUN apt-get update && apt-get install -y default-mysql-client

# Copie o JAR do aplicativo para o diretório de trabalho
COPY etl-java-app/etl-java-app.jar .

# Copie o script de espera para o container
COPY wait-for-mysql-connection.sh .

# Torne o script de espera executável
RUN chmod +x /app/wait-for-mysql-connection.sh

# Comando para rodar o aplicativo, aguardando o MySQL estar pronto
CMD ["sh", "-c", "/app/wait-for-mysql-connection.sh db && java -jar etl-java-app.jar && tail -f /dev/null"]