package com.jobmarketplace.backend.repository;

import com.jobmarketplace.backend.entity.ApplicationStatus;
import com.jobmarketplace.backend.entity.Job;
import com.jobmarketplace.backend.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface JobApplicationRepository
        extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByApplicantEmailOrderByAppliedAtDesc(String email);

    List<JobApplication> findByJobProviderEmailOrderByAppliedAtDesc(String email);

    boolean existsByJobIdAndApplicantEmail(Long jobId, String email);

    long countByJobId(Long jobId);

    List<JobApplication> findByJobId(Long jobId);


    List<JobApplication> findByJobIdAndStatus(
            Long jobId,
            ApplicationStatus status
    );
}

