package com.byteworks.dev.backendservices.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "locations")
public class Location extends Base{
    private String name;
    private double latitude;
    private double longitude;
    private double clearingCost;
    private String visited;
    @ManyToMany(cascade = CascadeType.ALL)
//    @JsonIgnoreProperties(ignoreUnknown = true)
    private List<Location> neighbours;
//    @ManyToMany
//    private List<OptimalRoute> routes;


    @Override
    public String toString() {
        return "Location{" +
                "name='" + name + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", clearingCost=" + clearingCost +
                ", visited='" + visited + '\'' +
                ", neighbours=" + neighbours +
                '}';
    }

}
