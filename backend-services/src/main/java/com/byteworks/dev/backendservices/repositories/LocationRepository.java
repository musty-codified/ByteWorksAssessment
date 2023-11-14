package com.byteworks.dev.backendservices.repositories;

import com.byteworks.dev.backendservices.entities.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
    boolean existsByName(String name);
}
