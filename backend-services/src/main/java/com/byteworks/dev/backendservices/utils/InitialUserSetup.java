package com.byteworks.dev.backendservices.utils;

import com.byteworks.dev.backendservices.entities.User;
import com.byteworks.dev.backendservices.enums.Roles;
import com.byteworks.dev.backendservices.enums.Status;
import com.byteworks.dev.backendservices.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class InitialUserSetup implements CommandLineRunner {
private final UserRepository userRepository;
private final PasswordEncoder passwordEncoder;
private final AppUtils appUtil;

@Value("${admin.email}")
private String adminEmail;

    @Override
    public void run(String... args) throws Exception {

        if(!userRepository.existsByEmail(adminEmail)) {
            System.out.println("initializing Admin user");
            User adminUser = User.builder()
                    .email(adminEmail)
                    .firstName("Papi")
                    .lastLoginDate(new Date())
                    .lastName("Maciano")
                    .roles(Roles.ROLE_ADMIN.getAuthorities().stream().map(Objects::toString)
                            .collect(Collectors.joining(",")))
                    .uuid(appUtil.generateSerialNumber("admin"))
                    .status(Status.ACTIVE.name())
                    .password(passwordEncoder.encode("123456"))
                    .build();
            userRepository.save(adminUser);
            System.out.println("Admin user created");
        }
        else {
            System.out.println("User already exist");
        }

    }
}
