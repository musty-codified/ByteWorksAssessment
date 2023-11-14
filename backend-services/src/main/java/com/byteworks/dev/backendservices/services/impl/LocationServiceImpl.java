package com.byteworks.dev.backendservices.services.impl;

import com.byteworks.dev.backendservices.dtos.requests.LocationDto;
import com.byteworks.dev.backendservices.dtos.response.LocationResponseDto;
import com.byteworks.dev.backendservices.entities.Location;
import com.byteworks.dev.backendservices.repositories.LocationRepository;
import com.byteworks.dev.backendservices.services.LocationService;
import com.byteworks.dev.backendservices.utils.AppUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {
    private final LocationRepository locationRepository;

    private final AppUtils appUtil;

    @Override
    public LocationResponseDto addLocation(LocationDto locationDto) {
        if(locationRepository.existsByName(locationDto.getName()))
            throw new RuntimeException("Location already exists");

        Location location = appUtil.getMapper().convertValue(locationDto, Location.class);
        location.setClearingCost(appUtil.getRandomClearingCost());

        return appUtil.getMapper().convertValue(locationRepository.save(location), LocationResponseDto.class);
    }
}
