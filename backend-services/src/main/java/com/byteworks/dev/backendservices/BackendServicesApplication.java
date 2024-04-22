package com.byteworks.dev.backendservices;

import com.github.javafaker.Faker;
import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@OpenAPIDefinition(
		info=@Info(
				title = "Package Delivery RESTful Web API Documentation",
				description = "These pages document a Delivery App Web service Endpoints",
				version = "1.0",
				contact = @Contact(
						name = "Musty-codified",
						email = "ewalletappllc@gmail.com",
						url = "https://springdoc.org"
				),
				license = @License(
						name = "Apache 2.0.",
						url =  "https://www.apache.org/licenses/LICENSE-2.0.html"
				)
		),
		externalDocs = @ExternalDocumentation(
				description = "Package Delivery REST API External Documentation",
				url = "https://springdoc.org"
		),
		servers = {
				@Server(
						url = "http://localhost:8888/",
						description = "The Development API Server"
				),
		}
)

@SpringBootApplication
public class BackendServicesApplication {

	public static void main(String[] args) {
	  SpringApplication.run(BackendServicesApplication.class, args);

	}

	@Bean
	public PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

	@Bean
	public Faker faker(){
		return new Faker();
	}

}
