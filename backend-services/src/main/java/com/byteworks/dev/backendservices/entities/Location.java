package com.byteworks.dev.backendservices.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;


@Data
@Builder
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

}
