package com.jobmarketplace.backend.entity;

import com.jobmarketplace.backend.entity.ApplicationStatus;
import com.jobmarketplace.backend.entity.Job;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications",
        uniqueConstraints = @UniqueConstraint(columnNames = {"job_id", "applicant_email"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Job info
    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    // Applicant info
    private String applicantEmail;
    private String applicantName;
    private String applicantPhone;
    private String applicantSkills;

    // Job provider
    private String jobProviderEmail;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    private LocalDateTime appliedAt;
}
