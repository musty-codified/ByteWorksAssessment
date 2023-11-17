package com.byteworks.dev.backendservices.entities;
import lombok.*;

import javax.persistence.*;


@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "locations")
public class Location extends Base{
    private String name;
    private double latitude;
    private double longitude;
    private double clearingCost;

    public Location( double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    @Override
    public String toString() {
        return "Location{" +
                "name='" + name + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", clearingCost=" + clearingCost +
                '}';
    }

}
