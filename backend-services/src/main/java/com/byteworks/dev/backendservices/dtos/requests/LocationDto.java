package com.byteworks.dev.backendservices.dtos.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationDto {
     @NotBlank(message = "Name of location is required")
     private String name;

     @DecimalMin(value = "-90.0", message = "latitude should be greater than or equal to -90")
     @DecimalMax(value = "90.0", message =  "latitude should be less than than or equal to 90")
     private double latitude;

     @DecimalMin(value = "-180.0",  message = "longitude should be less than than or equal to -180 ")
     @DecimalMax(value = "180.0",  message = "longitude should be less than than or equal to 180")
     private double longitude;

     @Min(25)
     @Max(100)
     private double clearingCost;

}
