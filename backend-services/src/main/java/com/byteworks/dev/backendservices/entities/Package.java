package com.byteworks.dev.backendservices.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "packages")
public class Package extends Base{

    @OneToOne(cascade = CascadeType.ALL)
    private Location origin;

    @OneToOne(cascade = CascadeType.ALL)
    private Location destination;

    private Double distance;

    private BigDecimal deliveryCost;


}
