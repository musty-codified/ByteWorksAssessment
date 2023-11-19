package com.byteworks.dev.backendservices.services;

import com.byteworks.dev.backendservices.dtos.DeliveryRouteDto;
import com.byteworks.dev.backendservices.entities.DeliveryRoute;


public interface RouteService {
    DeliveryRouteDto findOptimalRoute(Long originId, Long destinationId);
}
