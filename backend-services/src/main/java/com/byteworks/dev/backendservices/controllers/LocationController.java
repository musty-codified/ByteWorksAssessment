package com.byteworks.dev.backendservices.controllers;

import com.byteworks.dev.backendservices.dtos.requests.ActivateUserDto;
import com.byteworks.dev.backendservices.dtos.requests.LocationDto;
import com.byteworks.dev.backendservices.dtos.response.ApiResponse;
import com.byteworks.dev.backendservices.dtos.response.LocationResponseDto;
import com.byteworks.dev.backendservices.dtos.response.UserResponseDto;
import com.byteworks.dev.backendservices.services.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/locations")
public class LocationController {
    private final LocationService locationService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<LocationResponseDto>> addLocation(@RequestBody LocationDto locationDto){
        return ResponseEntity.ok().body( new ApiResponse<>("User activated", true, locationService.addLocation(locationDto)));
    }
}
