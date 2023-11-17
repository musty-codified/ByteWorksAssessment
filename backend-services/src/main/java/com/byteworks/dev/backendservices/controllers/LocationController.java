package com.byteworks.dev.backendservices.controllers;

import com.byteworks.dev.backendservices.dtos.requests.LocationDto;
import com.byteworks.dev.backendservices.dtos.response.ApiResponse;
import com.byteworks.dev.backendservices.dtos.response.LocationResponseDto;
import com.byteworks.dev.backendservices.dtos.response.RouteResponseDto;
import com.byteworks.dev.backendservices.services.LocationService;
import com.byteworks.dev.backendservices.services.RouteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Tag(name = "Location Endpoint")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/locations")
public class LocationController {
    private final LocationService locationService;
    private final RouteService routeService;



    @Operation(summary = "Adds a location object to the database")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<LocationResponseDto>> addLocation(@RequestBody LocationDto locationDto){
        // Validate and process the request body (e.g., name, latitude, longitude)

        return ResponseEntity.ok().body( new ApiResponse<>("Location added successfully", true, locationService.addLocation(locationDto)));
    }

    @Operation(summary = "Fetches a list of location object")
    @GetMapping("/view-list")
    public ResponseEntity<ApiResponse<Page<LocationResponseDto>>> getLocations(@RequestParam(value = "page", defaultValue = "0") int page,
                                                                           @RequestParam(value = "limit", defaultValue = "5") int limit,
                                                                           @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
                                                                           @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        return ResponseEntity.ok().body( new ApiResponse<>("Locations retrieved successfully", true, locationService.getLocations( page, limit, sortBy, sortDir)));

    }

    @Operation(summary = "Fetches a list of location object closest to a specific location")
    @GetMapping("/view-closest")
    public ResponseEntity<ApiResponse<Page<LocationResponseDto>>> getClosestLocations(@RequestParam(value = "locationName", defaultValue = "lima") String locationName,
                                                                                      @RequestParam(value = "page", defaultValue = "0") int page,
                                                                               @RequestParam(value = "limit", defaultValue = "5") int limit,
                                                                               @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
                                                                               @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir,
                                                                                      @RequestParam(value = "howMany", defaultValue = "3", required = false) int howMany) {
        return ResponseEntity.ok().body( new ApiResponse<>(" Closest Locations retrieved successfully", true, locationService.findClosestLocations(locationName,  page, limit, sortBy, sortDir, howMany)));

    }

    @Operation(summary = "Updates location object")

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<LocationResponseDto>> updateLocation(@PathVariable Long id, @RequestBody LocationDto locationDto){
        return ResponseEntity.ok().body( new ApiResponse<>("Location updated successfully", true, locationService.updateLocation(id, locationDto)));
    }

    @Operation(summary = "Retrieves a single location object")
    @GetMapping("{id}")
    public ResponseEntity<ApiResponse<LocationResponseDto>> findLocation(@PathVariable Long id){
        return ResponseEntity.ok().body( new ApiResponse<>("Location retrieve successfully", true, locationService.findLocationById(id)));
    }

    @Operation(summary = "Removes location object from database")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity <HttpStatus> deleteLocation(@PathVariable Long id){
        locationService.deleteLocation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "Calculates and retrieves a list of all the optimal routes from an origin location")
    @GetMapping("/optimal-route")
    public ResponseEntity<ApiResponse<RouteResponseDto>> calculateOptimalRoute(@RequestParam Long originId, @RequestParam Long destinationId){
        return ResponseEntity.ok().body( new ApiResponse<>("Optimal Route calculated", true, routeService.findOptimalRoutes(originId, destinationId)));
    }


}
