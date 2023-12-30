package com.byteworks.dev.backendservices.entities;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;


@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "locations")
public class Location extends Base{

    @Column(unique = true)
    private String name;
    private double latitude;
    private double longitude;
    @Min(25)
    @Max(100)
    private double clearingCost;
    @ManyToOne
    @JoinColumn(name = "delivery_route_id")
    private DeliveryRoute deliveryRoute;

    @Override
    public String toString() {
        return "Location{" +
                "name='" + name + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", clearingCost=" + clearingCost +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        Location location = (Location) o;
        return Double.compare(location.latitude, latitude) == 0
                && Double.compare(location.longitude, longitude) == 0;
    }


}
