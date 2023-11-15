package com.byteworks.dev.backendservices.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.List;


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

    private double calculateDistanceCost(double distance) {
        // Cost per kilometer = $1.00
        return 1.00 * distance;
    }

    private double calculateClearingCost(List<Location> route) {
        // Sum of clearing costs for each location (excluding origin)
        double clearingCost = 0.0;
        for (Location location : route) {
            clearingCost += location.getClearingCost();
        }
        return clearingCost;
    }

}
