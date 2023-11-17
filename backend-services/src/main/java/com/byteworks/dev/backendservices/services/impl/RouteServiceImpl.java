package com.byteworks.dev.backendservices.services.impl;

import com.byteworks.dev.backendservices.dtos.requests.LocationDto;
import com.byteworks.dev.backendservices.dtos.response.RouteResponseDto;
import com.byteworks.dev.backendservices.entities.Location;
import com.byteworks.dev.backendservices.exceptions.NotFoundException;
import com.byteworks.dev.backendservices.repositories.LocationRepository;
import com.byteworks.dev.backendservices.services.RouteService;
import com.byteworks.dev.backendservices.utils.AppUtils;
import com.byteworks.dev.backendservices.utils.LocationUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RouteServiceImpl implements RouteService {
    private final AppUtils appUtil;
    private final LocationUtils locationUtil;
    private final LocationRepository locationRepository;

    @Override
    public RouteResponseDto findOptimalRoutes(Long originId, Long destinationId) {
    Location origin = locationRepository.findById(originId)
            .orElseThrow(()-> new NotFoundException("Location not found"));

        System.out.println(originId);

    Location destination = locationRepository.findById(destinationId)
            .orElseThrow(()-> new NotFoundException("Location not found"));

        System.out.println(destinationId);

        List<Location> optimalRoute = new ArrayList<>();


        optimalRoute.add(origin);  // Start with the origin

        Location currentLocation = origin;


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

        double totalCost = locationUtil.calculateTotalCost(optimalRoute);
        return new RouteResponseDto(routeList, totalCost);
    }

    private Location findNextLocation(Location currentLocation, Location destination) {
        // Placeholder logic to find the next location based on the shortest distance
        List<Location> neighbors =
                locationUtil.findClosestLocations(currentLocation, locationRepository.findAll(), 3);

        if (neighbors.isEmpty()) {
            return null;
        }

        Location nextLocation = neighbors.get(0); // Start with the first neighbor
        double shortestDistance = locationUtil.calculateDistance(nextLocation, destination);

        for (Location neighbor : neighbors) {
            double distance = locationUtil.calculateDistance(neighbor, destination);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                nextLocation = neighbor;
            }
        }

        return nextLocation;
    }


}

