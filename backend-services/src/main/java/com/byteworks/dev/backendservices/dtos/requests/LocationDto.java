package com.byteworks.dev.backendservices.dtos.requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationDto {
    private String name;
    private double latitude;
    private double longitude;
}
