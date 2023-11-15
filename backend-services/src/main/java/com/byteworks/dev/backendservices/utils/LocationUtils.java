package com.byteworks.dev.backendservices.utils;

import com.byteworks.dev.backendservices.entities.Location;
import com.byteworks.dev.backendservices.repositories.LocationRepository;
import com.byteworks.dev.backendservices.services.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
@RequiredArgsConstructor
public class LocationUtils {
private final LocationRepository locationRepository;
private final LocationService locationService;
private final AppUtils appUtil;

    public void populateNeighbors() {
        System.out.println("populating neighbours...");
        List<Location> allLocations = locationService.fetchAllLocations();

        appUtil.print(allLocations);

        for (Location location : allLocations) {
            List<Location> neighbors = findNearbyLocations(location, allLocations);
            location.setNeighbours(neighbors);

            System.out.println("Location after populating neighbours: " + location);
            locationRepository.save(location);
        }
    }

    private List<Location> findNearbyLocations(Location target, List<Location> allLocations) {
        System.out.println("finding nearby locations....");
        double radius = 100.0;
        List<Location> nearbyLocations = new ArrayList<>();

        for (Location location : allLocations) {
            if (!location.equals(target) && calculateDistance(target, location) < radius) {
                nearbyLocations.add(location);
            }
        }
        return nearbyLocations;
    }

    private double calculateDistance(Location from, Location to) {
        return Math.sqrt(Math.pow(from.getLatitude() - to.getLatitude(), 2) +
                Math.pow(from.getLongitude() - to.getLongitude(), 2));
    }
}
