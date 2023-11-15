package com.byteworks.dev.backendservices.dtos.requests;


import com.byteworks.dev.backendservices.entities.OptimalRoute;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationDto {
    private String name;
    private double latitude;
    private double longitude;

//    private Set<OptimalRoute> route;
}
