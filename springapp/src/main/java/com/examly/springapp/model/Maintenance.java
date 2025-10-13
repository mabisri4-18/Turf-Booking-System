package com.examly.springapp.model;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Maintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long maintenanceId;

    @ManyToOne
    @JoinColumn(name = "facility_id", nullable = true)
    private Facility facility;

    private LocalDate scheduledDate;

    private String description;

    private String status; // pending, completed
}
