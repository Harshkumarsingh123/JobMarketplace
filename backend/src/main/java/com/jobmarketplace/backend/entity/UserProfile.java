package com.jobmarketplace.backend.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer age;
    private String phone;
    private String address;
    private String city;

    private String status; // STUDENT, WORKING, JOB_SEEKER
    private String skills;

    @Column(length = 500)
    private String about;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
