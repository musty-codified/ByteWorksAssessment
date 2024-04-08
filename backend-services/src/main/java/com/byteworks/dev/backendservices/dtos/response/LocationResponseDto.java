package com.byteworks.dev.backendservices.dtos.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationResponseDto {

    private Long id;
    private String name;
//    private String imageUrl;
    private Double latitude;
    private Double longitude;
    private Double clearingCost;
}
