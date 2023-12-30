package com.byteworks.dev.backendservices.dtos.requests;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationDto {

    @NotBlank
    private String name;

    @DecimalMin(value = "-90.0")
    @DecimalMax(value = "90.0")
    @NotBlank
    private Double latitude;

    @NotBlank
    @DecimalMin(value = "-180.0")
    @DecimalMax(value = "180.0")
    private Double longitude;

}
