# ---------- Build stage ----------
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy Gradle configuration first so Docker can cache dependencies
COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .

RUN chmod +x gradlew

# Download dependencies
RUN ./gradlew dependencies --no-daemon

# Copy application source
COPY src src

# Build the Spring Boot application
RUN ./gradlew bootJar --no-daemon


# ---------- Runtime stage ----------
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the application JAR from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Render will provide PORT in production.
# Local Docker testing will default to 8080.
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]