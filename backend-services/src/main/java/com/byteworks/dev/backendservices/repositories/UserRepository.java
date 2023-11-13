package com.byteworks.dev.backendservices.repositories;

import com.byteworks.dev.backendservices.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
}
