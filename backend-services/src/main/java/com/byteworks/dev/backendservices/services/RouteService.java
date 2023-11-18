package com.byteworks.dev.backendservices.services;

import com.byteworks.dev.backendservices.dtos.response.LocationResponseDto;
import com.byteworks.dev.backendservices.dtos.response.RouteResponseDto;
import com.byteworks.dev.backendservices.entities.DeliveryRoute;
import com.byteworks.dev.backendservices.entities.Location;

import java.util.List;

public interface RouteService {
    DeliveryRoute findOptimalRoute(Long originId, Long destinationId);
}
