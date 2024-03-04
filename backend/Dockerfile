# Build stage using Maven and JDK 17
FROM maven:3.8.4-openjdk-17 as build

# Copy the project files to the container
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app

WORKDIR /usr/src/app

# Build the application
RUN mvn clean package -DskipTests

# Run stage using Alpine with OpenJDK 17
FROM alpine:3.16.0

# Install OpenJDK 17
RUN apk add --no-cache java-cacerts openjdk17-jdk

# Set the Java Home environment variable
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk
ENV PATH="$JAVA_HOME/bin:${PATH}"

# Create a non-root user and group for running the application
# This is a security best practice
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy the built jar file from the build stage
COPY --from=build /usr/src/app/target/*.jar /app.jar

# Run the application as the non-root user
USER appuser

# Expose the port your application listens on
EXPOSE 8080

CMD ["java", "-jar", "/app.jar"]