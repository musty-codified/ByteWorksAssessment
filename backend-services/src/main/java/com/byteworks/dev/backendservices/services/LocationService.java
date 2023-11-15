package com.byteworks.dev.backendservices.services;

import com.byteworks.dev.backendservices.dtos.requests.LocationDto;
import com.byteworks.dev.backendservices.dtos.response.LocationResponseDto;
import com.byteworks.dev.backendservices.entities.Location;
import org.springframework.data.domain.Page;

import java.util.List;

public interface LocationService {

    LocationResponseDto addLocation(LocationDto locationDto);

    Page<LocationResponseDto> getLocations(int page, int limit, String sortBy, String sortDir);

    LocationResponseDto updateLocation (Long id,  LocationDto locationDto);

    List<Location> fetchAllLocations();
    void deleteLocation( Long id);

    LocationResponseDto findLocationById(Long id);
}
