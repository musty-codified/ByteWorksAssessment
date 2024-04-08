package com.byteworks.dev.backendservices.utils;

import com.byteworks.dev.backendservices.entities.Location;
import com.byteworks.dev.backendservices.repositories.LocationRepository;
import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.IntStream;
@Component
@RequiredArgsConstructor
public class FakeDB implements CommandLineRunner {
    private final LocationRepository locationRepository;
    private final Faker faker;
    @Override
    public void run(String... args) throws Exception {
        IntStream.rangeClosed(1, 10).forEach(i->{
            Location location = createLocation();
            locationRepository.save(location);
        });
        System.out.println("pre-Populating Database with random data");
    }

    private Location createLocation(){
        return Location.builder()
                .name(faker.lorem().words(3).toString().replace("[", "").replace("]", ""))
                .latitude(faker.number().randomDouble(1, -90, 90))
                .longitude(faker.number().randomDouble(1, -180, 180))
                .clearingCost(faker.number().randomDouble(2, 25, 100))
                .build();

    }


}
