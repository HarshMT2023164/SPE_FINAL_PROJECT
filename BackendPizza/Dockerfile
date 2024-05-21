FROM openjdk:17-jdk
EXPOSE 8085
ARG JAR_FILE=target/*.jar
COPY ./target/pizzaproject-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]