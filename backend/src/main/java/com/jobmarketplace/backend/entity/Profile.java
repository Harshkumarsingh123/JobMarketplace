package com.jobmarketplace.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;   // comes from JWT

    private String name;
    private Integer age;
    private String phone;
    private String address;
    private String city;
    private String status;   // STUDENT | WORKING | JOB_SEEKER
    private String skills;
    private Double latitude;
    private Double longitude;


    @Column(length = 1000)
    private String about;

    @Column(name = "photo_path")
    private String photoPath;
}
