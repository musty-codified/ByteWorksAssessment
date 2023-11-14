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
@Table(name = "routes")
public class Route extends Base{

    @OneToMany
    private Set<Location> locations;
    @OneToOne
    private Package item;
}
