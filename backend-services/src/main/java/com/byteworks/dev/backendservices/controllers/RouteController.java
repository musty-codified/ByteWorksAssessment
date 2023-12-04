package com.byteworks.dev.backendservices.controllers;

import com.byteworks.dev.backendservices.dtos.DeliveryRouteDto;
import com.byteworks.dev.backendservices.dtos.response.ApiResponse;
import com.byteworks.dev.backendservices.services.RouteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Tag(name = "Route Endpoint", description = "REST API for generating optimal route between two specific locations")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/routes")
public class RouteController {
    private final RouteService routeService;
    @Operation(summary = "Generates the optimal routes a package takes from an origin to a destination")
    @GetMapping("/optimal-route")
    public ResponseEntity<ApiResponse<DeliveryRouteDto>> optimalRoute(@RequestParam Long originId, @RequestParam Long destinationId){
        return ResponseEntity.ok().body( new ApiResponse<>("Optimal Route calculated", true, routeService.findOptimalRoute(originId, destinationId)));
    }
}
