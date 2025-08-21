FROM openjdk:22-jdk
ADD target/VirtualBookStore-app.jar book-app.jar
ENTRYPOINT ["java","-jar","/book-app.jar"]