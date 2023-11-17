package com.byteworks.dev.backendservices.utils;

import com.byteworks.dev.backendservices.entities.Location;
import com.byteworks.dev.backendservices.repositories.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class LocationUtils {
private final LocationRepository locationRepository;
private final AppUtils appUtil;

    public void populateNeighbors(int howMany) {

        List<Location> allLocations = locationRepository.findAll();

        System.out.println("read location data for " + allLocations.size());

        for (Location location : allLocations) {
            List<Location> neighbors = findClosestLocations(location, allLocations, howMany);

//            List<Location> neighbors = neighborIndexes.stream()
//                    .map(allLocations::get)
//                    .collect(Collectors.toList());

            appUtil.print(neighbors);

            location.setNeighbours(neighbors);

            locationRepository.save(location);
        }
    }


    public List<Location> findClosestLocations(Location target, List<Location> allLocations, int howMany) {
        List<Location> copy= new ArrayList<>(allLocations);
        System.out.println("Inside findClosestLocation");

//        double radius = 250;
              List<Location> closest = new ArrayList<>();

              for(int j = 0; j < howMany; j++){

              int minIndex = 0;
              for(int i =0; i < copy.size(); i++){

                  Location loc = copy.get(i);
                  if(calculateDistance(loc, target) <
                          calculateDistance(copy.get(minIndex), target)){
                      minIndex = i;
                  }

              }
                  closest.add(copy.get(minIndex));
                  copy.remove(minIndex);

              }
        return closest;
    }
    private double calculateDistance(Location from, Location to) {
        if (from.equals(to))
            return 0.0;
        return Math.sqrt(Math.pow(from.getLatitude() - to.getLatitude(), 2) +
                Math.pow(from.getLongitude() - to.getLongitude(), 2));
    }
}
