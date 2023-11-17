package com.byteworks.dev.backendservices.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;

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
    @OneToMany(cascade = CascadeType.ALL)
    @BatchSize(size = 3)
    private List<Location> neighbours;


//    @ManyToOne
//    @JoinColumn(name = "parent_id")
//    @JsonBackReference
//    private Location parent;
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
                ", neighbours=" + neighbours +
                '}';
    }

}
