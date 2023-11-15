package com.byteworks.dev.backendservices.services.impl;

import com.byteworks.dev.backendservices.dtos.requests.LocationDto;
import com.byteworks.dev.backendservices.dtos.response.LocationResponseDto;
import com.byteworks.dev.backendservices.dtos.response.RouteResponseDto;
import com.byteworks.dev.backendservices.entities.Location;
import com.byteworks.dev.backendservices.repositories.LocationRepository;
import com.byteworks.dev.backendservices.services.LocationService;
import com.byteworks.dev.backendservices.services.RouteService;
import com.byteworks.dev.backendservices.utils.AppUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RouteServiceImpl implements RouteService {
    private final AppUtils appUtil;
//    private final LocationService locationService;

    private final LocationRepository locationRepository;

    @Override
    public RouteResponseDto findOptimalRoutes(Long originId, Long destinationId) {
    Location origin = locationRepository.findById(originId)
            .orElseThrow(()-> new RuntimeException("Location not found"));
        System.out.println(originId);

    Location destination = locationRepository.findById(destinationId)
            .orElseThrow(()-> new RuntimeException("Location not found"));
        System.out.println(destinationId);

        List<Location> optimalRoute = new ArrayList<>();


        optimalRoute.add(origin);  // Start with the origin
        Location currentLocation = origin;

        appUtil.print(optimalRoute);

        List<LocationDto> routeList = optimalRoute.stream()
                .map(route-> appUtil.getMapper().convertValue(route, LocationDto.class))
                .collect(Collectors.toList());

        while (!currentLocation.equals(destination)) {
            Location nextLocation = findNextLocation(currentLocation, destination);


            if (nextLocation == null) {
                // No direct path to the destination
                return new RouteResponseDto(routeList, 0.0);
            }

            optimalRoute.add(nextLocation);
            currentLocation = nextLocation;
        }
        double totalCost = calculateTotalCost(optimalRoute);

        return new RouteResponseDto(routeList, totalCost);
    }

    private Location findNextLocation(Location currentLocation, Location destination) {
        // Placeholder logic to find the next location based on the shortest distance
        List<Location> neighbors = currentLocation.getNeighbours();

        if (neighbors.isEmpty()) {
            // No neighbors, return null
            return null;
        }

        Location nextLocation = neighbors.get(0); // Start with the first neighbor
        double shortestDistance = calculateDistance(nextLocation, destination);

        for (Location neighbor : neighbors) {
            double distance = calculateDistance(neighbor, destination);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                nextLocation = neighbor;
            }
        }

        return nextLocation;
    }
    private double calculateDistance(Location from, Location to) {
        return Math.sqrt(Math.pow(from.getLatitude() - to.getLatitude(), 2) +
                Math.pow(from.getLongitude() - to.getLongitude(), 2));
    }


    private double calculateTotalCost(List<Location> route) {
        double costPerKilometer = 1.00;
        double totalCost = 0.0;

        for (int i = 0; i < route.size() - 1; i++) {
            Location from = route.get(i);
            Location to = route.get(i + 1);
            double distance = calculateDistance(from, to);
            totalCost += distance * costPerKilometer;
        }
        return totalCost;
    }
}

