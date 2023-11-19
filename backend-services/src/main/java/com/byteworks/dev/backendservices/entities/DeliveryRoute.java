package com.byteworks.dev.backendservices.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "routes")
public class DeliveryRoute extends Base{

    @OneToMany(mappedBy = "deliveryRoute", cascade = CascadeType.ALL)
   private List<Location> locations;

    private double totalCost;


}
