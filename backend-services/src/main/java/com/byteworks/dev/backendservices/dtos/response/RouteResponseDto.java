package com.byteworks.dev.backendservices.dtos.response;

import com.byteworks.dev.backendservices.dtos.requests.LocationDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class RouteResponseDto {
    private List<LocationDto> route;
    private double totalCost;

}
