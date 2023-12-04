package com.byteworks.dev.backendservices.services;

import com.byteworks.dev.backendservices.dtos.DeliveryRouteDto;


public interface RouteService {
    DeliveryRouteDto findOptimalRoute(Long originId, Long destinationId);
}
