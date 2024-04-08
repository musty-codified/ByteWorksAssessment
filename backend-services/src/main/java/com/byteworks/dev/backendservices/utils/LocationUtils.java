package com.byteworks.dev.backendservices.utils;

import com.byteworks.dev.backendservices.entities.Location;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class LocationUtils {
    public List<Location> findClosestLocations(Location target, List<Location> allLocations, int howMany) {
        List<Location> copy = new ArrayList<>(allLocations);

        List<Location> closest = new ArrayList<>();

        for (int j = 0; j < howMany; j++) {

            int minIndex = 0;
            for (int i = 0; i < copy.size(); i++) {
                Location loc = copy.get(i);
                if (calculateDistance(loc, target) <
                        calculateDistance(copy.get(minIndex), target)) {
                    minIndex = i;
                }
            }
            closest.add(copy.get(minIndex));
            copy.remove(minIndex);
        }
        closest.removeIf(location -> location.equals(target));
        return closest;
    }

    public double calculateDistance(Location from, Location to) {
        if (from.equals(to))
            return 0.0;
        return Math.sqrt(Math.pow(from.getLatitude() - to.getLatitude(), 2)
                + Math.pow(from.getLongitude() - to.getLongitude(), 2));
    }

    public double calculateTotalCost(List<Location> waypoints) {
        double costPerKilometer = 1.00;
        double totalCost = 0.0;

        for (int i = 0; i < waypoints.size() - 1; i++) {
            Location from = waypoints.get(i);
            Location to = waypoints.get(i + 1);
            double distance = calculateDistance(from, to);
            totalCost += distance * costPerKilometer;

            // Add clearing cost for each intermediate location
            if (i < waypoints.size() - 1) {
                totalCost += from.getClearingCost();
            }
        }
        return totalCost;

    }
}