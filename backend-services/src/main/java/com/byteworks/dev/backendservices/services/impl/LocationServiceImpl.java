package com.byteworks.dev.backendservices.services.impl;

import com.byteworks.dev.backendservices.dtos.requests.LocationDto;
import com.byteworks.dev.backendservices.dtos.response.LocationResponseDto;
import com.byteworks.dev.backendservices.entities.Location;
import com.byteworks.dev.backendservices.enums.LocationStatus;
import com.byteworks.dev.backendservices.repositories.LocationRepository;
import com.byteworks.dev.backendservices.services.LocationService;
import com.byteworks.dev.backendservices.utils.AppUtils;
import com.byteworks.dev.backendservices.utils.LocationUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {
    private final LocationRepository locationRepository;
    private final AppUtils appUtil;
    private final LocationUtils locationUtils;

    @Override
    public LocationResponseDto addLocation(LocationDto locationDto) {
        if(locationRepository.existsByName(locationDto.getName()))
            throw new RuntimeException("Location already exists");

        Location location = appUtil.getMapper().convertValue(locationDto, Location.class);
        location.setClearingCost(appUtil.getRandomClearingCost());
        location.setVisited(LocationStatus.NOT_VISITED.name());

        System.out.println("Before Populating Neighbors: " + location.getNeighbours());

       locationUtils.populateNeighbors();
        System.out.println("After Populating Neighbors: " + location.getNeighbours());

        return appUtil.getMapper().convertValue(locationRepository.save(location), LocationResponseDto.class);
    }

    @Override
    public Page<LocationResponseDto> getLocations(int page, int limit, String sortBy, String sortDir) {
        locationUtils.populateNeighbors();
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();
        System.out.println("calling get location");
        Pageable pageRequest = PageRequest.of(page, limit, sort);
        Page<Location> locationPages = locationRepository.findAll(pageRequest);
        List<LocationResponseDto> locationResponseDtos =
                locationPages.stream().map(location -> appUtil.getMapper().convertValue(location, LocationResponseDto.class))
                        .collect(Collectors.toList());
        //Pagination starts at zero, so I set the current page to one less. i.e. page 2 is page 1 etc
        if(page>0) page = page-1;
        int max = Math.min(limit * (page + 1), locationResponseDtos.size());
        int min = limit * page ;
        return new PageImpl<>(locationResponseDtos.subList(min,max),pageRequest, locationResponseDtos.size());
    }

    @Override
    public LocationResponseDto updateLocation(Long id, LocationDto locationDto) {

        Location existingLocation = locationRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Location not found"));

        existingLocation.setName(locationDto.getName());
        existingLocation.setLatitude(locationDto.getLatitude());
        existingLocation.setLongitude(locationDto.getLongitude());
        existingLocation.setClearingCost(appUtil.getRandomClearingCost());

        Location updatedLocation = locationRepository.save(existingLocation);
        LocationResponseDto locationResponseDto = appUtil.getMapper().convertValue(updatedLocation, LocationResponseDto.class);

        return locationResponseDto;
    }
    @Override
    public void deleteLocation(Long id) {
        Location location = locationRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Location not found"));
            locationRepository.delete(location);

    }
    @Override
    public LocationResponseDto findLocationById(Long id) {
       Location location = locationRepository.findById(id).orElseThrow(()-> new RuntimeException("Location not found"));
        return appUtil.getMapper().convertValue(location, LocationResponseDto.class);
    }


}

