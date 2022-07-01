FROM gradle:7.4.2-jdk17-alpine as builder
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon -x test
FROM openjdk:17
EXPOSE 8070
RUN mkdir /app
COPY --from=builder /home/gradle/src/build/libs/*.jar /app/api.jar
ENTRYPOINT ["java","-jar","/app/api.jar"]