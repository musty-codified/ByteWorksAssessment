package com.byteworks.dev.backendservices.services;

import com.byteworks.dev.backendservices.dtos.requests.LocationDto;
import com.byteworks.dev.backendservices.dtos.response.LocationResponseDto;

public interface LocationService {

    LocationResponseDto addLocation(LocationDto locationDto);
}
