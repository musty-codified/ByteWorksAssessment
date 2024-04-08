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

     @DecimalMin(value = "-90.0", message = "Invalid")
     @DecimalMax(value = "90.0", message = "Invalid")
     private double latitude;

     @DecimalMin(value = "-180.0",  message = "Invalid  ")
     @DecimalMax(value = "180.0",  message = "Invalid")
     private double longitude;

     @Min(25)
     @Max(100)
     private double clearingCost;

    @Override
    public boolean equals(Object o){
        LocationDto locationDto = (LocationDto) o;
       return getName().equals(locationDto.getName());
    }
    @Override
    public int hashCode(){
        return name.hashCode();
    }
}
