package com.byteworks.dev.backendservices.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "packages")
public class Package extends Base{

    @ManyToOne(cascade = CascadeType.ALL)
    private Location origin;

    @ManyToOne(cascade = CascadeType.ALL)
    private Location destination;

    private double distance; //distance between origin and destination

    @OneToMany
    private Set<Location> route; // Sequence of locations from origin to destination

//    @OneToOne(mappedBy = "item", cascade = CascadeType.ALL)
//    private OptimalRoute route;

    @OneToOne(mappedBy = "item", cascade = CascadeType.ALL)
    private DeliveryCost deliveryCost;

}
