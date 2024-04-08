package com.byteworks.dev.backendservices.services.impl;

import com.byteworks.dev.backendservices.dtos.DeliveryRouteDto;
import com.byteworks.dev.backendservices.entities.DeliveryRoute;
import com.byteworks.dev.backendservices.entities.Location;
import com.byteworks.dev.backendservices.exceptions.NotFoundException;
import com.byteworks.dev.backendservices.repositories.LocationRepository;
import com.byteworks.dev.backendservices.services.LocationService;
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
    private final LocationService locationService;


//       @Override
//    public DeliveryRoute getOptimalRoute(Long originId, Long destinationId) {
//        List<DeliveryResponseDto> waypoints = getAllLocationsExceptOriginAndDestination(originId, destinationId);
//
//        GeoApiContext geoApiContext = new GeoApiContext.Builder()
//                .apiKey("your-google-api-key")
//                .build();
//
//        String[] waypointAddresses = waypoints.stream()
//                .map(location -> location.getLatitude() + "," + location.getLongitude())
//                .toArray(String[]::new);
//
//        DistanceMatrixApiRequest distanceMatrixApiRequest = DistanceMatrixApi.newRequest(geoApiContext)
//                .mode(TravelMode.DRIVING);
//
//        try {
//            DistanceMatrix distanceMatrix = distanceMatrixApiRequest.await();
//
//            return new DeliveryRoute();
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException("Error while calculating optimal route.");
//        }
//    }
//
//    private List<DeliveryResponseDto> getAllLocationsExceptOriginAndDestination(Long originId, Long destinationId) {
//        List<DeliveryResponseDto> allLocations = getAllDeliveryLocations(0, Integer.MAX_VALUE).getContent();
//
//        allLocations.removeIf(location -> location.getId().equals(originId) || location.getId().equals(destinationId));
//
//        return allLocations;
//    }

    @Override
    public DeliveryRouteDto findOptimalRoute(Long originId, Long destinationId) {

//      Page<LocationResponseDto> wayPoints = getLocationsExceptOriginAndDestination(originId, destinationId);

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

        return appUtil.getMapper().convertValue(deliveryRoute, DeliveryRouteDto.class);

    }

//    private Page<LocationResponseDto> getLocationsExceptOriginAndDestination(long originId, long destinationId) {
//        Page<LocationResponseDto> locationResponseDtos =
//                locationService.getLocations(0, Integer.MAX_VALUE, "name", Sort.Direction.ASC.name());
//        locationResponseDtos.getContent().removeIf(location->location.getId().equals(originId) ||location.getId().equals(destinationId));
//        return locationResponseDtos;
//
//    }
    private List<Location> reconstructPath(Map<Location, Location> locationMap, Location destination) {
        List<Location> paths = new ArrayList<>();
        Location currentLocation = destination;

        while (currentLocation != null) {
            paths.add(currentLocation);
            currentLocation = locationMap.get(currentLocation);
        }
        Collections.reverse(paths);
        return paths;
    }

    private List <Location> bfs (Location origin, Location destination){
        Queue<Location> queue = new LinkedList<>();
        Map<Location, Location> locationMap = new HashMap<>();
        Set<Location> visited = new HashSet<>();

        queue.add(origin);
        visited.add(origin);

        while (!queue.isEmpty()){
            //queue.remove() also works but poll() is null safe
            Location currentLocation = queue.poll();

            if (currentLocation.equals(destination)) {
                // Destination reached, reconstruct the path
                List<Location> optimalRoute = reconstructPath(locationMap, destination);

                return optimalRoute;
            }

            //Consider changing the implementation of findClosestLocation(after removing the origin and destination)
            List <Location> locationList = locationUtil.findClosestLocations(currentLocation, locationRepository.findAll(), 3);
            for (Location neighbor : locationList) {
                if (!visited.contains(neighbor)) {
                    // Visit unvisited neighbors
                    queue.add(neighbor);
                    visited.add(neighbor);
                    locationMap.put(neighbor, currentLocation);
                }
            }

        }
        return Collections.emptyList();

    }

}

