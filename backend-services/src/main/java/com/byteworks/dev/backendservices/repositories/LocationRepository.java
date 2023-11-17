package com.byteworks.dev.backendservices.repositories;

import com.byteworks.dev.backendservices.entities.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
    boolean existsByName(String name);
    Optional<Location> findByName(String name);
}
