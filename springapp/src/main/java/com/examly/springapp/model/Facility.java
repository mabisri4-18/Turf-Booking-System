package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "facilities")
public class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long facilityId;

    private String name;
    private String type; // turf, court, pool
    private String location;
    private String availabilityStatus; // available, unavailable
}
