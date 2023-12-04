package com.byteworks.dev.backendservices.dtos;


import com.byteworks.dev.backendservices.dtos.response.LocationResponseDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class DeliveryRouteDto {

    private List<LocationResponseDto> locations;

    private double totalCost;
}
