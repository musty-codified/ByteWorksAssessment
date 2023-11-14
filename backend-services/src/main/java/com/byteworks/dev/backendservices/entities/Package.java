package com.byteworks.dev.backendservices.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    private double distance;

}
