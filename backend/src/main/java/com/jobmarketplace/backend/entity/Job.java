package com.jobmarketplace.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "jobs")
@Getter @Setter @Builder
@NoArgsConstructor @AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String location;
    private Double latitude;
    private Double longitude;
    private String address;
    private String hours;
    private String pay;
    private String type;

    private String postedByEmail;

    private LocalDateTime startDateTime;
    private LocalTime endTime;

    private LocalDateTime createdAt;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (expiresAt == null) {
            expiresAt = createdAt.plusHours(48);
        }
        if (active == null) {
            active = true;
        }
    }

}
