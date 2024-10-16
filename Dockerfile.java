# Dockerfile.java

# Use uma imagem base do OpenJDK
FROM openjdk:21-jdk

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o JAR para o diretório de trabalho
COPY etl-java-app/etl-java-app.jar .

# Corrija o comando para usar o nome correto do JAR
CMD ["java", "-jar", "etl-java-app.jar"]