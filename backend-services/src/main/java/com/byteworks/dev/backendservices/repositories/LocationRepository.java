package com.byteworks.dev.backendservices.repositories;

import com.byteworks.dev.backendservices.entities.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
    boolean existsByName(String name);
    Optional<Location> findByName(String name);


//    @Query("SELECT l from Location l WHERE " +
//    "(:searchTerm IS NULL OR " +
//            "LOWER(CONCAT(l.route)) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
//            "LOWER(CONCAT(l.latitude)) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
//            "LOWER(CONCAT(l.latitude)) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
//
//    )
    Page<Location> findByLocationCriteria(@Param("searchTerm") String searchTerm,
                                          @Param("route") List<String> route,
                                          @Param("clearingCost") double clearingCost,
                                          @Param("totalCost") double totalCost,
                                          @Param("latitude") double latitude,
                                          @Param("longitude") double longitude,
                                          Pageable pageable);
}
