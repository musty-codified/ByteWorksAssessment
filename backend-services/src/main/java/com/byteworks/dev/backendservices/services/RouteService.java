package com.byteworks.dev.backendservices.services;

import com.byteworks.dev.backendservices.dtos.response.RouteResponseDto;

public interface RouteService {
    RouteResponseDto findOptimalRoutes(Long originId, Long destinationId);
}
