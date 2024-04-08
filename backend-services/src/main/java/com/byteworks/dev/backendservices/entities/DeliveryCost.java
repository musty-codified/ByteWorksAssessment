package com.byteworks.dev.backendservices.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "delivery_costs")
public class DeliveryCost extends Base{

    private double distanceCost;
    private double clearanceCost;
    private double totalCost;
    @OneToOne
    private Package item;

}
