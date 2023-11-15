package com.byteworks.dev.backendservices.controllers;

import com.byteworks.dev.backendservices.dtos.requests.LocationDto;
import com.byteworks.dev.backendservices.dtos.response.ApiResponse;
import com.byteworks.dev.backendservices.dtos.response.LocationResponseDto;
import com.byteworks.dev.backendservices.dtos.response.RouteResponseDto;
import com.byteworks.dev.backendservices.services.LocationService;
import com.byteworks.dev.backendservices.services.RouteService;
import com.byteworks.dev.backendservices.utils.AppUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/locations")
public class LocationController {
    private final LocationService locationService;
    private final RouteService routeService;
    private final AppUtils appUtil;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<LocationResponseDto>> addLocation(@RequestBody LocationDto locationDto){
        // Validate and process the request body (e.g., name, latitude, longitude)

        return ResponseEntity.ok().body( new ApiResponse<>("Location added successfully", true, locationService.addLocation(locationDto)));
    }


    @GetMapping("/view-list")
    public ResponseEntity<ApiResponse<Page<LocationResponseDto>>> getPosts(@RequestParam(value = "page", defaultValue = "0") int page,
                                                                           @RequestParam(value = "limit", defaultValue = "5") int limit,
                                                                           @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
                                                                           @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        return ResponseEntity.ok().body( new ApiResponse<>("Locations retrieved successfully", true, locationService.getLocations( page, limit, sortBy, sortDir)));

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<LocationResponseDto>> updateLocation(@PathVariable Long id, @RequestBody LocationDto locationDto){
        return ResponseEntity.ok().body( new ApiResponse<>("Location updated successfully", true, locationService.updateLocation(id, locationDto)));
    }
    @GetMapping("{id}")
    public ResponseEntity<ApiResponse<LocationResponseDto>> findLocation(@PathVariable Long id){
        return ResponseEntity.ok().body( new ApiResponse<>("Location retrieve successfully", true, locationService.findLocationById(id)));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity <HttpStatus> deleteLocation(@PathVariable Long id){
        locationService.deleteLocation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/optimal-route")
    public ResponseEntity<ApiResponse<RouteResponseDto>> calculateOptimalRoute(@RequestParam Long originId, @RequestParam Long destinationId){
        return ResponseEntity.ok().body( new ApiResponse<>("Optimal Route calculated", true, routeService.findOptimalRoutes(originId, destinationId)));
    }


}
