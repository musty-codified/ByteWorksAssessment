package com.byteworks.dev.backendservices.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "delivery_costs")
public class DeliveryCost extends Base{
    private BigDecimal distanceCost;
    private BigDecimal clearanceCost;

}
