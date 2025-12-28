package com.jobmarketplace.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(nullable = true)
    private String location;

    private Double latitude;
    private Double longitude;

    @Column(nullable = false)
    private String address;

    private String hours;
    private String pay;
    private String type;

    private String postedByEmail; // from JWT
    private LocalDateTime startDateTime;
    private LocalTime endTime;

    private LocalDateTime createdAt;

}
