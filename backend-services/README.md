# Courier-and-Logistics Backend-API
Backend REST apis in Spring Boot for optimizing the delivery of packages from origin to destination

`Built with Spring Boot, secured with Spring Security (JWT), and documented with Swagger (API),`

## Technology  used ##
Following tools and libraries were used during the development of the API :
- **Java 17** -
- **Spring Boot**
- **Build Tool: Maven**
- **H2 database**
- **Swagger** - API documentation [here](http://localhost:9090/swagger-ui/index.html#/)
- **JWT**
- **Memcached**


### Authentication and Authorization
Uses Spring Security with JWT for stateless authentication and authorization.

### Deployment
The application can be deployed on any Java Servlet container, or docker containers.

## Running the server locally ##
*  **Ensure Memcached is installed and running on your machine before you run this service.
* **Clone the repository:** git clone https://github.com/musty-codified/ByteWorksAssessment.git
* **Build the project using maven:** mvn clean install
* **Run the application from the command line:** mvn spring-boot:run

### Support
For any issues or queries, please raise a ticket on the GitHub repository or email me at ilemonamustapha@@gmail.com.

## API Documentation ##
The application exposes a RESTful API for creating and managing delivery locations and optimizing routes.
The tool for API documentation used in is Swagger, you can open the same inside a browser at the following url - [here](http://localhost:9090/swagger-ui/index.html#/)






