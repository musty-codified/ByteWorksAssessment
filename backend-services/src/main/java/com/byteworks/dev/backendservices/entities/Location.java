package com.byteworks.dev.backendservices.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "locations")
public class Location extends Base{
    private String name;
    private String address;
    private String email;
    private Double delivery;

    @ManyToOne
    private Route route;
}
