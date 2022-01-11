FROM maven:3.8.4 AS maven

WORKDIR /usr/src/app/wt-backend

COPY . /usr/src/app/wt-backend

RUN mvn package

FROM adoptopenjdk/openjdk11:alpine-jre

ARG JAR_FILE=backend-0.0.1-SNAPSHOT.jar

WORKDIR /opt/app/wt-backend

COPY --from=maven /usr/src/app/wt-backend/target/${JAR_FILE} /opt/app/wt-backend

ENTRYPOINT ["java","-jar","backend-0.0.1-SNAPSHOT.jar"]