package com.byteworks.dev.backendservices.utils;

import com.byteworks.dev.backendservices.entities.Location;
import com.byteworks.dev.backendservices.repositories.LocationRepository;
import com.byteworks.dev.backendservices.services.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;


@Component
@RequiredArgsConstructor
public class LocationUtils {
private final LocationRepository locationRepository;
//private final LocationService locationService;
private final AppUtils appUtil;

    public void populateNeighbors() {
        System.out.println("Inside populateNeighbours method");
        List<Location> allLocations = locationRepository.findAll();
        appUtil.print(allLocations);

        List<Location> neighbors = null;
        for (Location location : allLocations) {
            try {
             neighbors = findNearbyLocations(location, allLocations);
            } catch (Exception e )
            {
                e.printStackTrace();
            }

            System.out.println("Inside populateNeighbours method");
            appUtil.print(neighbors);
            location.setNeighbours(neighbors);

            System.out.println("Location after populating neighbours: " + location);

            appUtil.print(allLocations);

            locationRepository.save(location);
        }
    }


    private List<Location> findNearbyLocations(Location target, List<Location> allLocations) {
        System.out.println("inside findNearbyLocations method....");
        double radius = 250;

        List<Location> nearbyLocations = new ArrayList<>();
        System.out.println("nearby locations before finding..." + nearbyLocations);

        for (Location location : allLocations) {
            System.out.println("checking location..." + location.getName());
            System.out.println("checking target..." + target.getName());


            if (target != null && !location.equals(target) && calculateDistance(target, location) <= radius) {

                // Check if the location is not already in the nearbyLocations list
                if (!nearbyLocations.contains(target)) {
                    nearbyLocations.add(location);

                }
                appUtil.print(target);
                System.out.println("nearby locations after finding..." + nearbyLocations);

            }
        }
        return nearbyLocations;
    }

    private double calculateDistance(Location from, Location to) {
        if (from.equals(to))
            return 0.0;
        return Math.sqrt(Math.pow(from.getLatitude() - to.getLatitude(), 2) +
                Math.pow(from.getLongitude() - to.getLongitude(), 2));
    }
}
