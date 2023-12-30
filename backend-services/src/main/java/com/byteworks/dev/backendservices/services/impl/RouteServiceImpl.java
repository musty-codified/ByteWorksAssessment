package com.byteworks.dev.backendservices.services.impl;

import com.byteworks.dev.backendservices.dtos.DeliveryRouteDto;
import com.byteworks.dev.backendservices.entities.DeliveryRoute;
import com.byteworks.dev.backendservices.entities.Location;
import com.byteworks.dev.backendservices.exceptions.NotFoundException;
import com.byteworks.dev.backendservices.repositories.LocationRepository;
import com.byteworks.dev.backendservices.services.RouteService;
import com.byteworks.dev.backendservices.utils.AppUtils;
import com.byteworks.dev.backendservices.utils.LocationUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RouteServiceImpl implements RouteService {
    private final AppUtils appUtil;
    private final LocationUtils locationUtil;
    private final LocationRepository locationRepository;

    @Override
    public DeliveryRouteDto findOptimalRoute(Long originId, Long destinationId) {

      Location origin = locationRepository.findById(originId)
              .orElseThrow(()-> new NotFoundException("origin not found"));
      Location destination = locationRepository.findById(destinationId)
              .orElseThrow(()-> new NotFoundException("destination not found"));

       // Call the BFS algorithm to calculate the optimal route
        List<Location> optimalRoute = bfs(origin, destination);

        double totalCost = locationUtil.calculateTotalCost(optimalRoute);

        // Create and return the DeliveryRoute object
        DeliveryRoute deliveryRoute = new DeliveryRoute();
        deliveryRoute.setLocations(optimalRoute);
        deliveryRoute.setTotalCost(totalCost);

      DeliveryRouteDto deliveryRouteDto = appUtil.getMapper().convertValue(deliveryRoute, DeliveryRouteDto.class);

        return deliveryRouteDto;

    }

    private List<Location> reconstructPath(Map<Location, Location> parentMap, Location destination) {
        List<Location> paths = new ArrayList<>();
        Location currentLocation = destination;

        while (currentLocation != null) {
            paths.add(currentLocation);
            currentLocation = parentMap.get(currentLocation);
        }
        Collections.reverse(paths);
        return paths;
    }


    private List <Location> bfs (Location origin, Location destination){
        Queue<Location> queue = new LinkedList<>();
        Map<Location, Location> parentMap = new HashMap<>();
        Set<Location> visited = new HashSet<>();

        queue.add(origin);
        visited.add(origin);

        while (!queue.isEmpty()){
            Location currentLocation = queue.poll();

            if (currentLocation.equals(destination)) {
                // Destination reached, reconstruct the path
                List<Location> optimalRoute = reconstructPath(parentMap, destination);

                return optimalRoute;
            }

            List <Location> locationList = locationUtil.findClosestLocations(currentLocation, locationRepository.findAll(), 3);
            for (Location neighbor : locationList) {
                if (!visited.contains(neighbor)) {
                    // Visit unvisited neighbors
                    queue.add(neighbor);
                    visited.add(neighbor);
                    parentMap.put(neighbor, currentLocation);
                }
            }

        }
        return Collections.emptyList();

    }

}

